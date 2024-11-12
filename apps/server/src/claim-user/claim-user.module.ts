import { Module } from "@nestjs/common";
import { ClaimUserController } from "./claim-user.controller";
import { ClaimUserService } from "./claim-user.service";
import { PrismaModule } from "../prisma/prisma.module";
import { ClaimModule } from "../claim/claim.module";

@Module({
    imports: [PrismaModule, ClaimModule],
    controllers: [ClaimUserController],
    providers: [ClaimUserService],
})
export class ClaimUserModule {

}