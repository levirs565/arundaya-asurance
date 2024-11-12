import { Module } from "@nestjs/common";
import { ClaimAdminService } from "./claim-admin.service";
import { ClaimAdminController } from "./claim-admin.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { ClaimModule } from "../claim/claim.module";

@Module({
    providers: [ClaimAdminService],
    controllers: [ClaimAdminController],
    imports: [PrismaModule, ClaimModule]
})
export class ClaimAdminModule {

}