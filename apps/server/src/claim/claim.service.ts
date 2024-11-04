import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import SessionData from "../types/session";
import { validateAccountLoggedIn } from "../common/service.helper";
import { PrismaService } from "../prisma/prisma.service";
import { CommonServiceException } from "../common/common-service.exception";
import { Claim, ClaimState } from "@prisma/client";

@Injectable()
export class ClaimService {
    constructor(private readonly prismaClient: PrismaService) { }

    async make(session: SessionData, description: string, hospital: string, type: string) {
        validateAccountLoggedIn(session);

        const user = await this.prismaClient.user.findUnique({
            where: {
                accountId: session.account.id
            }
        })

        if (!user)
            throw Error("User NIK not found");

        const claim = await this.prismaClient.claim.create({
            data: {
                userNik: user.nik,
                date: new Date(),
                description,
                hospital,
                type,
                state: ClaimState.NOT_ASSIGNED
            }
        })

        return claim.id
    }

    private validateClaimOwner(claim: Claim, session: SessionData) {
        if (claim.userNik != session.account.nik) {
            throw new CommonServiceException("You are not claim owner")
        }
    }

    private async findClaim(id: number): Promise<Claim> {
        const claim = await this.prismaClient.claim.findUnique({
            where: { id }
        })

        if (!claim) {
            throw new HttpException("Claim not found", HttpStatus.NOT_FOUND);
        }

        return claim;
    }

    async cancel(session: SessionData, id: number) {
        validateAccountLoggedIn(session);

        const claim = await this.findClaim(id);
        this.validateClaimOwner(claim, session)

        await this.prismaClient.claim.delete({
            where: { id }
        })
    }

    async list(session: SessionData): Promise<Claim[]> {
        validateAccountLoggedIn(session);

        return await this.prismaClient.claim.findMany({
            where: {
                userNik: session.account.nik
            }
        })
    }

    async get(session: SessionData, id: number): Promise<Claim> {
        validateAccountLoggedIn(session);

        const claim = await this.findClaim(id);
        this.validateClaimOwner(claim, session)

        return claim;
    }

    async edit(session: SessionData, id: number, description: string, hospital: string, type: string) {
        validateAccountLoggedIn(session)

        const claim = await this.findClaim(id);
        this.validateClaimOwner(claim, session)

        // TODO: Add last edit time
        await this.prismaClient.claim.update({
            where: {id},
            data: {
                description,
                hospital,
                type
            }
        })
    }
}