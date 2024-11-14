import { Module } from "@nestjs/common";
import { AdminEmployeeController } from "./admin-employee.controller";
import { AdminEmployeeService } from "./admin-employee.service";
import { AccountModule } from "../account/account.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    controllers: [AdminEmployeeController],
    providers: [AdminEmployeeService],
    imports: [AccountModule, PrismaModule]
})
export class AdminEmployeeModule {

}