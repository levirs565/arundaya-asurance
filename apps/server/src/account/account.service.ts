import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { genSalt, hash, compare } from "bcrypt";
import { AccountType, Day, Employee, UserClass } from '@prisma/client';
import { CommonServiceException } from '../common/common-service.exception';
import { AccountData, EmployeeDataDto } from '../types/account';

const saltRounds = 10;

@Injectable()
export class AccountService {
  constructor(private readonly prismaClient: PrismaService) { }

  private async hashPassword(password: string) {
    const salt = await genSalt(saltRounds);
    return await hash(password, salt);
  }

  async validateIdNotUsed(id: string) {
    if (await this.prismaClient.account.count({
      where: {
        id
      }
    }) > 0) {
      throw new CommonServiceException("Account with this ID already registered");
    }
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
    await this.validateIdNotUsed(id);

    if (await this.prismaClient.user.count({
      where: {
        nik
      }
    }) > 0) {
      throw new CommonServiceException("User with this NIK already registered")
    }

    // TODO: NIK validation

    await this.prismaClient.account.create({
      data: {
        id,
        name,
        passwordHash: await this.hashPassword(password),
        type: AccountType.USER
      }
    });
    await this.prismaClient.user.create({
      data: {
        nik,
        accountId: id,
        birthDate,
        job,
        income,
        motherName,
        subscriptionClass: UserClass.A
      }
    })
  }

  async addEmployee(
    id: string,
    name: string,
    password: string,
    startDay: Day,
    startTime: Date,
    endDay: Day,
    endTime: Date
  ) {
    await this.validateIdNotUsed(id);

    // TODO: Make ohter query like this
    await this.prismaClient.account.create({
      data: {
        id,
        passwordHash: await this.hashPassword(password),
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

  async addAdmin(
    id: string,
    name: string,
    password: string
  ) {
    await this.validateIdNotUsed(id);

    await this.prismaClient.account.create({
      data: {
        id,
        name,
        passwordHash: await this.hashPassword(password),
        type: AccountType.ADMIN
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
    const matched = await compare(password, account.passwordHash);

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
