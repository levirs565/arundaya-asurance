import { Body, Controller, Param, ParseIntPipe, Post, Put, Session, UseInterceptors } from "@nestjs/common";
import { AllowedAccountType } from "../common/account-type.guard";
import { ActionInterceptor } from "../common/action.interceptor";
import { SessionData } from "express-session";
import { ClaimEmployeeService } from "./claim-employee.service";
import { ClaimState } from "@prisma/client";
import { ClaimAdminSetMessageDto } from "../types/claim-admin";

@Controller()
@AllowedAccountType("EMPLOYEE")
export class ClaimEmployeeController {
    constructor(private claimService: ClaimEmployeeService) {}

    @Post("/:id/take")
    @UseInterceptors(ActionInterceptor)
    async take(@Param("id", ParseIntPipe) id: number, @Session() session: SessionData) {
        await this.claimService.take(id, session.account);
    }

    @Post("/:id/accept")
    @UseInterceptors(ActionInterceptor)
    async accept(@Param("id", ParseIntPipe) id: number, @Session() session: SessionData) {
        await this.claimService.setState(id, session.account, ClaimState.ACCEPTED);
    }

    @Post("/:id/reject")
    @UseInterceptors(ActionInterceptor)
    async reject(@Param("id", ParseIntPipe) id: number, @Session() session: SessionData) {
        await this.claimService.setState(id, session.account, ClaimState.REJECTED);
    }

    @Put("/:id/message")
    @UseInterceptors(ActionInterceptor)
    async setMessage(@Param("id", ParseIntPipe) id: number, @Session() session: SessionData, @Body() body: ClaimAdminSetMessageDto) {
        await this.claimService.setMessage(id, body.message, session.account);
    }
}