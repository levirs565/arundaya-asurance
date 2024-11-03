import { Body, Controller, Get, Post, Session, UseInterceptors } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountLoginDto, AccountStateDto, UserSignupDto } from "../types/account";
import { ActionInterceptor } from "../common/action.interceptor";
import session, { SessionData } from "express-session";

@Controller()
export class AccountController {
    constructor(private accountService: AccountService) {}

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
    @Post("/login")
    @UseInterceptors(ActionInterceptor)
    async login(@Body() body: AccountLoginDto, @Session() session: SessionData) {
        await this.accountService.login(body.id, body.password, session)
    }
    
    @Post("/logout")
    @UseInterceptors(ActionInterceptor)
    async logout(@Session() session: SessionData){
        await this.accountService.logout(session)
    }
    
    @Get("/state")
    async state(@Session() session: SessionData) {
        console.log(session)
        return {
            account: session.account
        } as AccountStateDto
    }
}