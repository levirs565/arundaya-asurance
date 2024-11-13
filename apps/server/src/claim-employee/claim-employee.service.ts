import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AccountData } from "../types/account";
import { ClaimService } from "../claim/claim.service";
import { CommonServiceException } from "../common/common-service.exception";
import { Claim, ClaimState } from "@prisma/client";

@Injectable()
export class ClaimEmployeeService {
    constructor(private readonly prismaClient: PrismaService, private readonly claimService: ClaimService) {}

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

    validateCanChange(claim: Claim, account: AccountData) {
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