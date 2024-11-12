import { Module } from "@nestjs/common";
import { ClaimService } from "./claim.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    providers: [ClaimService],
    imports: [PrismaModule],
    exports: [ClaimService]
})
export class ClaimModule {}