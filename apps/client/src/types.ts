import {
    type Account,
    type AccountType,
    type Claim,
    type ClaimState,
    type User,
    type ClassData,
    type Day,
    type Premi,
    type Employee,
    type PremiState,
    type UserClass,
} from "@prisma/client";

type AllowedAccountType = "LOGGED" | "NOTLOGGED" | AccountType;
const dayEnums: [string, string, string, string, string, string, string] = ['Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'];

export {
    Account,
    AccountType,
    AllowedAccountType,
    Claim,
    ClaimState,
    User,
    ClassData,
    Day,
    Premi,
    Employee,
    PremiState,
    UserClass,
    dayEnums
}