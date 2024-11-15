import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AccountType, Day, Employee, UserClass } from '@prisma/client';
import { CommonServiceException } from '../common/common-service.exception';
import { AccountData, EmployeeDataDto } from '../types/account';
import { AccountManagerService } from './account-manager.service';

@Injectable()
export class AccountService {
  constructor(private readonly prismaClient: PrismaService, private readonly accountManager: AccountManagerService) { }

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
