import { Injectable } from "@nestjs/common";
import { Premi, PremiState } from "@prisma/client";
import SessionData from "../types/session";
import { validateAccountLoggedIn } from "../common/service.helper";
import { CommonServiceException } from "../common/common-service.exception";
import { PrismaService } from "../prisma/prisma.service";
import { startOfMonth } from "date-fns"

@Injectable()
export class PremiService {
    constructor(private readonly prismaClient: PrismaService) { }

    async hasPaid(session: SessionData): Promise<boolean> {
        validateAccountLoggedIn(session);
        return await this.prismaClient.premi.count({
            where: {
                userNik: session.account.nik,
                date: {
                    gte: startOfMonth(new Date())
                },
                state: PremiState.SUCCESS
            }
        }) > 0;
    }

    async pay(session: SessionData): Promise<number> {
        validateAccountLoggedIn(session);

        if (await this.hasPaid(session)) {
            throw new CommonServiceException("Has pay for this month")
        }

        if (await this.prismaClient.premi.count({
            where: {
                userNik: session.account.nik,
                state: PremiState.PENDING
            }
        }) > 0) {
            throw new CommonServiceException("You have pending premi");
        }

        const user = await this.prismaClient.user.findUnique({
            where: {
                nik: session.account.nik
            },
            select: {
                subscriptionClassData: true
            }
        })

        const premi = await this.prismaClient.premi.create({
            data: {
                userNik: session.account.nik,
                state: PremiState.PENDING,
                amount: user.subscriptionClassData.premiAmount
            }
        });

        return premi.id;
    }

    async get(session: SessionData, id: number): Promise<Premi> {
        validateAccountLoggedIn(session);

        const premi = await this.prismaClient.premi.findUnique({
            where: {
                id
            }
        });

        if (premi.userNik != session.account.nik) {
            throw new CommonServiceException("Cannot get other user premi");
        }

        return premi
    }

    async list(session: SessionData): Promise<Premi[]> {
        validateAccountLoggedIn(session);

        return await this.prismaClient.premi.findMany({
            where: {
                userNik: session.account.nik
            },
            orderBy: {
                date: "desc"
            }
        })
    }
}