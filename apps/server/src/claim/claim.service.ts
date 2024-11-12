import { Claim } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class ClaimService {
    constructor(private readonly prismaClient: PrismaService) { }

    async findClaim(id: number): Promise<Claim> {
        // TODO: select only useful field
        const claim = await this.prismaClient.claim.findUnique({
            where: { id }
        })

        if (!claim) {
            throw new HttpException("Claim not found", HttpStatus.NOT_FOUND);
        }

        return claim;
    }
}