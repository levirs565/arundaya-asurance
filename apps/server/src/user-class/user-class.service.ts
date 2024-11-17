import { Injectable } from "@nestjs/common";
import { ClassData, UserClass } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserClassService {
    constructor(private prismaClient: PrismaService) {}

    async list(): Promise<ClassData[]> {
        return await this.prismaClient.classData.findMany({
            orderBy: {
                name: "asc"
            }
        })
    }
}