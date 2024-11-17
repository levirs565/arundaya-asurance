import { AccountType, Day, UserClass } from "@prisma/client";

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

export interface EmployeeDataDto {
    id: string;
    name: string;
    startDay: Day;
    startTime: Date;
    endDay: Day;
    endTime: Date;
}

export interface EmployeeListDto {
    list: EmployeeDataDto[]
}

export interface EmployeeUpdateDto {
    id: string,
    name: string,
    password?: string,
    startDay: Day,
    startTime: Date,
    endDay: Day,
    endTime: Date
}

export interface AccountDataDto {
    name: string;
    type: AccountType;
    employee?: {
        startDay: Day;
        startTime: Date;
        endDay: Day;
        endTime: Date;
    };
    user?: {
        birthDate: Date
        job: string
        income: number
        motherName: string
        subscriptionClass: UserClass
    }
}

export interface AccountUpdateDataDto {
    name: string;
    user?: {
        birthDate: Date
        job: string
        income: number
        motherName: string
    }
}