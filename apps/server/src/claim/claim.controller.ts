import { Body, Controller, Delete, Get, Param, Post, Put, Session, UseInterceptors } from "@nestjs/common";
import { ClaimService } from "./claim.service";
import { EditClaimDto, MakeClaimDto, MakeClaimResponseDto } from "../types/claim";
import SessionData from "../types/session";
import { ActionInterceptor } from "../common/action.interceptor";
import { Claim } from "@prisma/client";

@Controller()
export class ClaimController {
    constructor(private claimService: ClaimService) { }

    @Post("/")
    async make(@Body() body: MakeClaimDto, @Session() session: SessionData): Promise<MakeClaimResponseDto> {
        return {
            id: await this.claimService.make(session, body.description, body.hospital, body.type)
        }
    }

    @Delete("/:id")
    @UseInterceptors(ActionInterceptor)
    async cancel(@Param("id") id: string, @Session() session: SessionData) {
        await this.claimService.cancel(session, parseInt(id));
    }

    @Get("/")
    async list(@Session() session: SessionData): Promise<Claim[]> {
        return await this.claimService.list(session);
    }


    @Get("/:id")
    async get(@Param("id") id: string, @Session() session: SessionData): Promise<Claim> {
        return await this.claimService.get(session, parseInt(id))
    }

    @Put("/:id")
    @UseInterceptors(ActionInterceptor)
    async edit(@Param("id") id: string, @Body() body: EditClaimDto, @Session() session: SessionData) {
        return await this.claimService.edit(session, parseInt(id), body.description, body.hospital, body.type);
    }
}