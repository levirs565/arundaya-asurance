import { AccountType } from "@prisma/client";

export interface AccountData {
    id: string;
    name: string;
    type: AccountType
}

export interface UserSignupDto {
    id: string,
    nik: string,
    name: string,
    password: string,
    birthDate: Date,
    job: string,
    income: number,
    motherName: string
}

export interface AccountLoginDto{
    id: string,
    password: string
}

export interface AccountStateDto {
    account: AccountData
}