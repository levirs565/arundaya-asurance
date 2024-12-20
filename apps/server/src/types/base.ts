export interface ActionSuccessResponse {
    success: true;
}

export interface ErrorResponse {
    error: {
        code: number;
        message: string;
    };
}