import { Body, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { AllowedAccountType } from "../common/account-type.guard";
import { ActionInterceptor } from "../common/action.interceptor";
import { AddEmployeeAccountDto, EmployeeListDto } from "../types/account";
import { AdminEmployeeService } from "./admin-employee.service";

@Controller()
@AllowedAccountType("ADMIN")
export class AdminEmployeeController {
    constructor(private employeeService: AdminEmployeeService) {}

    @AllowedAccountType("ADMIN")
    @Post("/")
    @UseInterceptors(ActionInterceptor)
    async addEmployee(@Body() body: AddEmployeeAccountDto) {
        await this.employeeService.addEmployee(body.id, body.name, body.password, body.startDay, body.startTime, body.endDay, body.endTime);
    }

    @AllowedAccountType("ADMIN")
    @Get("/")
    async listEmployee(): Promise<EmployeeListDto> {
        return {
            list: await this.employeeService.listEmployee()
        }
    }
}