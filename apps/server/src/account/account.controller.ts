import { Body, Controller, Get, Post, Session, UseInterceptors } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountLoginDto, AccountStateDto, AddEmployeeAccountDto, UserSignupDto } from "../types/account";
import { ActionInterceptor } from "../common/action.interceptor";
import { SessionData } from "express-session";
import { AllowedAccountType } from "../common/account-type.guard";

@Controller()
export class AccountController {
    constructor(private accountService: AccountService) {}

    @AllowedAccountType("NOTLOGGED")
    @Post("/signup-user")
    @UseInterceptors(ActionInterceptor)
    async signupUser(@Body() body: UserSignupDto) {
        await this.accountService.signupUser(
            body.id,
            body.nik,
            body.name,
            body.password,
            body.birthDate,
            body.job,
            body.income,
            body.motherName
        )
    }

    @AllowedAccountType("ADMIN")
    @Post("/add-employee")
    @UseInterceptors(ActionInterceptor)
    async registerEmployee(@Body() body: AddEmployeeAccountDto) {
        await this.accountService.addEmployee(body.id, body.name, body.password, body.startDay, body.startTime, body.endDay, body.endTime);
    }

    @AllowedAccountType("NOTLOGGED")
    @Post("/login")
    @UseInterceptors(ActionInterceptor)
    async login(@Body() body: AccountLoginDto, @Session() session: SessionData) {
        session.account = await this.accountService.login(body.id, body.password);
    }
    
    @AllowedAccountType("LOGGED")
    @Post("/logout")
    @UseInterceptors(ActionInterceptor)
    async logout(@Session() session: SessionData){
        session.account = undefined;
    }
    
    @Get("/state")
    async state(@Session() session: SessionData) {
        return {
            account: session.account
        } as AccountStateDto
    }
}