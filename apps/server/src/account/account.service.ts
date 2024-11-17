import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AccountType, Day, Employee, UserClass } from '@prisma/client';
import { CommonServiceException } from '../common/common-service.exception';
import { AccountData, AccountDataDto, AccountUpdateDataDto, EmployeeDataDto } from '../types/account';
import { AccountManagerService } from './account-manager.service';

@Injectable()
export class AccountService {
  constructor(private readonly prismaClient: PrismaService, private readonly accountManager: AccountManagerService) { }

  async getData(account: AccountData): Promise<AccountDataDto> {
    const data = await this.prismaClient.account.findUnique({
      where: {
        id: account.id
      },
      select: {
        name: true,
        type: true,
        employee: {
          select: {
            startDay: true,
            startTime: true,
            endDay: true,
            endTime: true
          }
        },
        user: {
          select: {
            nik: true,
            birthDate: true,
            job: true,
            income: true,
            motherName: true,
            subscriptionClass: true
          }
        }
      }
    })

    const res: AccountDataDto = {
      name: data.name,
      type: data.type
    };

    if (data.type == AccountType.EMPLOYEE)
      res.employee = {
        startTime: data.employee.startTime,
        endTime: data.employee.endTime,
        startDay: data.employee.startDay,
        endDay: data.employee.endDay
      }

    if (data.type == AccountType.USER)
      res.user = {
        birthDate: data.user.birthDate,
        income: data.user.income,
        job: data.user.job,
        motherName: data.user.motherName,
        subscriptionClass: data.user.subscriptionClass
      }

      return res;
  }

  async updateData(account: AccountData, data: AccountUpdateDataDto) {
    const updateData: Parameters<PrismaService["account"]["update"]>[0]["data"] = {
      name: data.name,
    }

    if (account.type == AccountType.USER) {
      if (!data.user) {
        throw new CommonServiceException("User data invalid");
      }

      updateData.user = {
        update: {
          birthDate: data.user.birthDate,
          job: data.user.job,
          income: data.user.income,
          motherName: data.user.motherName
        }
      }
    }

    await this.prismaClient.account.update({
      where: {
        id: account.id,
      },
      data: updateData
    })
  }

  async signupUser(
    id: string,
    nik: string,
    name: string,
    password: string,
    birthDate: Date,
    job: string,
    income: number,
    motherName: string
  ) {
    if (await this.prismaClient.user.count({
      where: {
        nik
      }
    }) > 0) {
      throw new CommonServiceException("User with this NIK already registered")
    }

    // TODO: NIK validation

    await this.accountManager.addAccount({
      id,
      name,
      password,
      type: AccountType.USER,
      user: {
        create: {
          nik,
          birthDate,
          job,
          income,
          motherName,
          subscriptionClass: UserClass.C
        }
      }
    })
  }

  async login(id: string, password: string): Promise<AccountData> {
    const account = await this.prismaClient.account.findUnique({
      where: { id }
    });

    if (!account) {
      throw new CommonServiceException("Account not found");
    }
    const matched = await this.accountManager.checkPassword(account.passwordHash, password);
    if (!matched) {
      throw new CommonServiceException("Invalid Password!")
    }

    let nik = undefined;

    if (account.type == AccountType.USER) {
      const user = await this.prismaClient.user.findUnique({
        where: {
          accountId: id
        }
      })

      if (!user)
        throw new Error("User NIK not found");

      nik = user.nik;
    }

    return {
      id,
      name: account.name,
      type: account.type,
      nik
    }
  }
}
