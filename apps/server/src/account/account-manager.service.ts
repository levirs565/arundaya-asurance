import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { genSalt, hash, compare } from "bcrypt";
import { CommonServiceException } from "../common/common-service.exception";

const saltRounds = 10;

@Injectable()
export class AccountManagerService {
    constructor(private readonly prismaClient: PrismaService) { }


    private async hashPassword(password: string) {
        const salt = await genSalt(saltRounds);
        return await hash(password, salt);
    }

    private async validateIdNotUsed(id: string) {
        if (await this.prismaClient.account.count({
            where: {
                id
            }
        }) > 0) {
            throw new CommonServiceException("Account with this ID already registered");
        }
    }

    async addAccount(
        { password, ...data }: Omit<Parameters<PrismaService["account"]["create"]>[0]["data"], "passwordHash"> &
        { password: string }) {
        await this.validateIdNotUsed(data.id);
        await this.prismaClient.account.create({
            data: {
                passwordHash: await this.hashPassword(password),
                ...data
            }
        })
    }

    async checkPassword(hash: string, password: string): Promise<boolean> {
        return await compare(password, hash);
    }

    async updateAccount(
        id: string,
        { password, ...other }: Omit<Parameters<PrismaService["account"]["update"]>[0]["data"], "passwordHash"> &
        { password: string }) {
        const data: Parameters<PrismaService["account"]["update"]>[0]["data"] = other;
        if (password) {
            data.passwordHash = await this.hashPassword(password);
        }
        await this.prismaClient.account.update({
            where: {
                id
            },
            data
        })
    }
}