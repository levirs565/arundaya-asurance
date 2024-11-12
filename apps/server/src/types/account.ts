import { AccountType, Day } from "@prisma/client";

export interface AccountData {
    id: string;
    name: string;
    type: AccountType
    nik?: string
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

export interface AccountLoginDto {
    id: string,
    password: string
}

export interface AccountStateDto {
    account: AccountData
}

export interface AddEmployeeAccountDto {
    id: string;
    name: string;
    password: string;
    startDay: Day,
    startTime: Date,
    endDay: Day,
    endTime: Date
}