import { Module } from "@nestjs/common";
import { ClaimEmployeeService } from "./claim-employee.service";
import { ClaimEmployeeController } from "./claim-employee.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { ClaimModule } from "../claim/claim.module";

@Module({
    providers: [ClaimEmployeeService],
    controllers: [ClaimEmployeeController],
    imports: [PrismaModule, ClaimModule]
})
export class ClaimEmployeeModule {

}