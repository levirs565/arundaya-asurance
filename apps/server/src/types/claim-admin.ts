import { Claim } from "@prisma/client";

export interface ClaimAdminSetMessageDto {
    message: string;
}

export interface ClaimAssignedDto {
    list: Claim[]
}


export interface ClaimAvailableDto {
    list: Claim[]
}