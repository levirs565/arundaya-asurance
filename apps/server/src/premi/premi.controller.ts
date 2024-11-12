import { Controller, Get, Param, ParseIntPipe, Post, Session } from "@nestjs/common";
import { PremiService } from "./premi.service";
import session, { SessionData } from "express-session";
import { HasPaidPremiResultDto, PayPremiResultDto, PremiListDto } from "../types/premi";
import { Premi } from "@prisma/client";
import { AllowedAccountType } from "../common/account-type.guard";

@Controller()
@AllowedAccountType("USER")
export class PremiController {
    constructor(private readonly premiService: PremiService) { }

    @Get("/has-paid")
    async hasPaid(@Session() session: SessionData): Promise<HasPaidPremiResultDto> {
        return {
            hasPaid: await this.premiService.hasPaid(session.account)
        }
    }

    @Post("/pay")
    async pay(@Session() session: SessionData): Promise<PayPremiResultDto> {
        return {
            id: await this.premiService.pay(session.account)
        }
    }

    @Get("/")
    async list(@Session() session: SessionData): Promise<PremiListDto> {
        return {
            list: await this.premiService.list(session.account)
        }
    }

    @Get("/:id")
    async get(@Session() session: SessionData, @Param("id", ParseIntPipe) id: number): Promise<Premi> {
        return await this.premiService.get(session.account, id);
    }
}