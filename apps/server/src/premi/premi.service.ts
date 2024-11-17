import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Premi, PremiState } from "@prisma/client";
import { CommonServiceException } from "../common/common-service.exception";
import { PrismaService } from "../prisma/prisma.service";
import { startOfMonth } from "date-fns"
import { AccountData } from "../types/account";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class PremiService {
    constructor(private readonly prismaClient: PrismaService) { }

    async hasPaid(account: AccountData): Promise<boolean> {
        return await this.prismaClient.premi.count({
            where: {
                userNik: account.nik,
                date: {
                    gte: startOfMonth(new Date())
                },
                state: PremiState.SUCCESS
            }
        }) > 0;
    }

    async cancel(account: AccountData, id: number) {
        const premi = await this.get(account, id);

        if (premi.state != PremiState.PENDING) {
            throw new CommonServiceException("Premi is not pending");
        }

        await this.prismaClient.premi.delete({
            where: {
                id: premi.id
            }
        })
    }

    async pay(account: AccountData): Promise<number> {
        if (await this.hasPaid(account)) {
            throw new CommonServiceException("Has pay for this month")
        }

        if (await this.prismaClient.premi.count({
            where: {
                userNik: account.nik,
                state: PremiState.PENDING
            }
        }) > 0) {
            throw new CommonServiceException("You have pending premi");
        }

        const user = await this.prismaClient.user.findUnique({
            where: {
                nik: account.nik
            },
            select: {
                subscriptionClassData: true
            }
        })

        const premi = await this.prismaClient.premi.create({
            data: {
                userNik: account.nik,
                state: PremiState.PENDING,
                amount: user.subscriptionClassData.premiAmount
            }
        });

        return premi.id;
    }

    async get(account: AccountData, id: number): Promise<Premi> {
        const premi = await this.prismaClient.premi.findUnique({
            where: {
                id
            }
        });

        if (!premi) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }

        if (premi.userNik != account.nik) {
            throw new CommonServiceException("Cannot get other user premi");
        }

        return premi
    }

    async list(account: AccountData): Promise<Premi[]> {
        return await this.prismaClient.premi.findMany({
            where: {
                userNik: account.nik
            },
            orderBy: {
                date: "desc"
            }
        })
    }

    @Cron("*/30 * * * * *")
    private async updatePremiState() {
        const firstPendingPremi = await this.prismaClient.premi.findFirst({
            where: {
                state: PremiState.PENDING
            },
            orderBy: {
                date: "asc"
            },
            select: {
                userNik: true,
                id: true
            }
        });

        if (!firstPendingPremi) {
            return;
        }

        const random = Math.random();
        const state = random >= 0.5 ? PremiState.SUCCESS : PremiState.FAIL;

        await this.prismaClient.premi.update({
            where: {
                id: firstPendingPremi.id,
            },
            data: {
                state
            }
        })
    }
}