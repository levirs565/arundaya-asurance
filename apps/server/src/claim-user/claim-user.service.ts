import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CommonServiceException } from "../common/common-service.exception";
import { Claim, ClaimState } from "@prisma/client";
import { AccountData } from "../types/account";
import { ClaimService } from "../claim/claim.service";

@Injectable()
export class ClaimUserService {
    constructor(private readonly prismaClient: PrismaService, private readonly claimService: ClaimService) { }

    async make(account: AccountData, description: string, hospital: string, type: string) {
        const claim = await this.prismaClient.claim.create({
            data: {
                userNik: account.nik,
                description,
                hospital,
                type,
                state: ClaimState.NOT_ASSIGNED
            }
        })

        return claim.id
    }

    private validateClaimOwner(claim: Claim, account: AccountData) {
        if (claim.userNik != account.nik) {
            throw new CommonServiceException("You are not claim owner")
        }
    }



    async cancel(account: AccountData, id: number) {
        const claim = await this.claimService.findClaim(id);
        this.validateClaimOwner(claim, account)

        await this.prismaClient.claim.delete({
            where: { id }
        })
    }

    async list(account: AccountData): Promise<Claim[]> {
        return await this.prismaClient.claim.findMany({
            where: {
                userNik: account.nik
            },
            orderBy: {
                date: "desc"
            }
        })
    }

    async get(account: AccountData, id: number): Promise<Claim> {
        const claim = await this.claimService.findClaim(id);
        this.validateClaimOwner(claim, account)

        return claim;
    }

    async edit(account: AccountData, id: number, description: string, hospital: string, type: string) {
        const claim = await this.claimService.findClaim(id);
        this.validateClaimOwner(claim, account)

        if (claim.state != ClaimState.NOT_ASSIGNED) {
            throw new CommonServiceException("You can only edit unassigned claim")
        }

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