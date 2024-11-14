import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseInterceptors } from "@nestjs/common";
import { AllowedAccountType } from "../common/account-type.guard";
import { ActionInterceptor } from "../common/action.interceptor";
import { AddEmployeeAccountDto, EmployeeListDto, EmployeeUpdateDto } from "../types/account";
import { AdminEmployeeService } from "./admin-employee.service";

@Controller()
@AllowedAccountType("ADMIN")
export class AdminEmployeeController {
    constructor(private employeeService: AdminEmployeeService) {}

    @Post("/")
    @UseInterceptors(ActionInterceptor)
    async addEmployee(@Body() body: AddEmployeeAccountDto) {
        await this.employeeService.addEmployee(body.id, body.name, body.password, body.startDay, body.startTime, body.endDay, body.endTime);
    }

    @Get("/")
    async listEmployee(): Promise<EmployeeListDto> {
        return {
            list: await this.employeeService.listEmployee()
        }
    }

    @Put("/:id")
    @UseInterceptors(ActionInterceptor)
    async edit(@Param("id") id: string, @Body() body: EmployeeUpdateDto) {
        await this.employeeService.updateEmployee(id, body.name, body.password, body.startDay, body.startTime, body.endDay, body.endTime);
    }
}