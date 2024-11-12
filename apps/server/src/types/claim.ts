import { Claim } from "@prisma/client"

export interface MakeClaimDto {
    description: string
    hospital: string
    type: string
}

export interface EditClaimDto {
    description: string
    hospital: string
    type: string
}

export interface MakeClaimResponseDto {
    id: number
}

export interface ClaimListDto {
    list: Claim[]
}