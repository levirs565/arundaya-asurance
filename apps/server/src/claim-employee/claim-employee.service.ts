import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AccountData } from "../types/account";
import { ClaimService } from "../claim/claim.service";
import { CommonServiceException } from "../common/common-service.exception";
import { Claim, ClaimState } from "@prisma/client";
import { ClaimEmployeeData, ClaimShort } from "../types/claim-admin";

@Injectable()
export class ClaimEmployeeService {
    constructor(private readonly prismaClient: PrismaService, private readonly claimService: ClaimService) {}

    async get(id: number, account: AccountData): Promise<ClaimEmployeeData> {
        const claim = await this.prismaClient.claim.findUnique({
            where: { id },
            select: {
                date: true,
                description: true,
                hospital: true,
                id: true,
                reviewMessage: true,
                type: true,
                state: true,
                assignedEmployeeId: true,
                user: {
                    select: {
                        subscriptionClass: true,
                        nik: true,
                        motherName: true,
                        job: true,
                        income: true,
                        birthDate: true,
                        account: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        if (!claim) {
            throw new HttpException("Claim not found", HttpStatus.NOT_FOUND);
        }

        const { user: {account: claimAccount, ...otherUser}, assignedEmployeeId, state, ...other } = claim;

        this.validateCanChange(claim, account);
        return {
            user: {
                name: claimAccount.name,
                ...otherUser  
            },
            ...other
        };
    }

    async listAssigned(account: AccountData): Promise<ClaimShort[]> {
        return (await this.prismaClient.claim.findMany({
            where: {
                state: ClaimState.ASSIGNED,
                assignedEmployeeId: account.id
            },
            orderBy: {
                date: "asc"
            },
            select: {
                id: true,
                date: true,
                type: true,
                user: {
                    select: {
                        account: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })).map(({ id, type, date, user }) => ({
            id,
            type,
            date,
            username: user.account.name
        }))
    }

    async listAvailable(): Promise<ClaimShort[]> {
        return (await this.prismaClient.claim.findMany({
            where: {
                state: ClaimState.NOT_ASSIGNED
            },
            orderBy: {
                date: "asc"
            },
            take: 10,
            select: {
                id: true,
                date: true,
                type: true,
                user: {
                    select: {
                        account: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })).map(({ id, type, date, user }) => ({
            id,
            type,
            date,
            username: user.account.name
        }))
    }

    async take(id: number, account: AccountData) {
        const claim = await this.claimService.findClaim(id);

        if (claim.state == ClaimState.ASSIGNED) {
            if (claim.assignedEmployeeId == account.id) {
                return;
            }

            if (claim.assignedEmployeeId != account.id) {
                throw new CommonServiceException("This claim is already taken");
            }
        }

        const affected = await this.prismaClient.claim.update({
            data: {
                assignedEmployeeId: account.id,
                state: ClaimState.ASSIGNED
            },
            where: {
                id,
                state: ClaimState.NOT_ASSIGNED,
            }
        })

        if (!affected) {
            throw new CommonServiceException("This claim maybe already taken");
        }
    }

    validateCanChange(claim: { state: ClaimState, assignedEmployeeId: string }, account: AccountData) {
        if (claim.state == ClaimState.ASSIGNED && claim.assignedEmployeeId == account.id) {
            return;
        }

        throw new CommonServiceException("You cannot change this claim");
    }

    async setMessage(id: number, message: string, account: AccountData) {
        const claim = await this.claimService.findClaim(id);
        this.validateCanChange(claim, account);
        await this.prismaClient.claim.update({
            data: {
                reviewMessage: message
            },
            where: {
                id
            }
        })
    }

    async setState(id: number, account: AccountData, state: ClaimState) {
        if (state != ClaimState.ACCEPTED && state != ClaimState.REJECTED) {
            throw new Error("Illegal argument for state");
        }

        const claim = await this.claimService.findClaim(id);

        if (!claim.reviewMessage) {
            throw new CommonServiceException("Review message must be filled");
        }

        this.validateCanChange(claim, account);
        await this.prismaClient.claim.update({
            data: {
                state
            },
            where: {
                id
            }
        })
    }
}