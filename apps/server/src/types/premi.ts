import { type Premi } from "@prisma/client"

export interface HasPaidPremiResultDto {
    hasPaid: boolean
}

export interface PayPremiResultDto {
    id: number
}

export interface PremiListDto {
    list: Premi[]
}