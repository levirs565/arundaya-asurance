import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { genSalt, hash, compare } from "bcrypt";
import SessionData from '../types/session';
import { AccountType, UserClass } from '@prisma/client';
import { CommonServiceException } from '../common/common-service.exception';
import { validateAccountLoggedIn } from '../common/service.helper'

const saltRounds = 10;

@Injectable()
export class AccountService {
  constructor(private readonly prismaClient: PrismaService) { }

  private async hashPassword(password: string) {
    const salt = await genSalt(saltRounds);
    return await hash(password, salt);
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
    if (await this.prismaClient.account.count({
      where: {
        id
      }
    }) > 0) {
      throw new CommonServiceException("Account with this ID already registered");
    }

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

  async login(id: string, password: string, SessionData: SessionData) {
    if (SessionData.account) {
      throw new CommonServiceException("Already Logged in!")
    }
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

    SessionData.account = {
      id,
      name: account.name,
      type: account.type,
      nik
    }
  }

  async logout(SessionData: SessionData) {
    validateAccountLoggedIn(SessionData);
    SessionData.account = undefined
  }
}
