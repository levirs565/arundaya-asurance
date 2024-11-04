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