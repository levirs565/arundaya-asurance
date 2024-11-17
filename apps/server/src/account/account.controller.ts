import { Body, Controller, Get, Post, Session, UseInterceptors } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountDataDto, AccountLoginDto, AccountStateDto, AccountUpdateDataDto, AddEmployeeAccountDto, EmployeeListDto, UserSignupDto } from "../types/account";
import { ActionInterceptor } from "../common/action.interceptor";
import { SessionData } from "express-session";
import { AllowedAccountType } from "../common/account-type.guard";

@Controller()
export class AccountController {
    constructor(private accountService: AccountService) {}

    @AllowedAccountType("LOGGED")
    @Get("/data")
    async getData(@Session() session: SessionData): Promise<AccountDataDto> {
        return await this.accountService.getData(session.account);
    }

    @AllowedAccountType("LOGGED")
    @Post("/data")
    @UseInterceptors(ActionInterceptor)
    async updatetData(@Session() session: SessionData, @Body() body: AccountUpdateDataDto) {
        await this.accountService.updateData(session.account, body);
    }

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