import { Claim, UserClass } from "@prisma/client";

export interface ClaimAdminSetMessageDto {
    message: string;
}

export interface ClaimEmployeeData {
    date: Date,
    description: string,
    hospital: string,
    id: number,
    reviewMessage: string,
    type: string,
    user: {
        name: string,
        subscriptionClass: UserClass,
        nik: string,
        motherName: string,
        job: string,
        income: number,
        birthDate: Date,
    }
}

export interface ClaimShort {
    username: string;
    type: string;
    id: number;
    date: Date;
}

export interface ClaimAssignedDto {
    list: ClaimShort[]
}


export interface ClaimAvailableDto {
    list: ClaimShort[]
}