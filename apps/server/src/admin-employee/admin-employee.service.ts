import { Injectable } from "@nestjs/common";
import { AccountType, Day, Employee } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AccountManagerService } from "../account/account-manager.service";
import { EmployeeDataDto } from "../types/account";

@Injectable()
export class AdminEmployeeService {
  constructor(private readonly prismaClient: PrismaService, private readonly accountManager: AccountManagerService) { }

  async addEmployee(
    id: string,
    name: string,
    password: string,
    startDay: Day,
    startTime: Date,
    endDay: Day,
    endTime: Date
  ) {
    await this.accountManager.addAccount({
      id,
      password,
      name,
      type: AccountType.EMPLOYEE,
      employee: {
        create: {
          startDay,
          startTime,
          endDay,
          endTime
        }
      }
    })
  }

  async listEmployee(): Promise<EmployeeDataDto[]> {
    return (await this.prismaClient.employee.findMany({
      select: {
        account: {
          select: {
            name: true
          }
        },
        id: true,
        startDay: true,
        startTime: true,
        endDay: true,
        endTime: true
      }
    })).map(({ account, id, startDay, startTime, endDay, endTime }) => ({
      name: account.name,
      id,
      startDay,
      startTime,
      endDay,
      endTime
    }))
  }

  async get(id: string): Promise<EmployeeDataDto> {
    const { account, startDay, startTime, endDay, endTime } = (await this.prismaClient.employee.findUnique({
      where: {
        id
      }, select: {
        account: {
          select: {
            name: true
          }
        },
        startDay: true,
        startTime: true,
        endDay: true,
        endTime: true
      }
    }))

    return {
      name: account.name,
      id,
      startDay,
      startTime,
      endDay,
      endTime
    }
  }

  async updateEmployee(
    id: string,
    name: string,
    password: string | undefined,
    startDay: Day,
    startTime: Date,
    endDay: Day,
    endTime: Date
  ) {
    const account = await this.prismaClient.account.findUnique({
      where: {
        id
      },
      select: {
        type: true
      }
    })

    if (account.type != AccountType.EMPLOYEE) {
      throw new Error("Cannot set non employee password");
    }


    await this.accountManager.updateAccount(id, {
      name,
      password,
      employee: {
        update: {
          startDay,
          startTime,
          endDay,
          endTime,
        }
      }
    })
  }
}