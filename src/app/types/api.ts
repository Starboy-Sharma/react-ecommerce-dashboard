export interface ApiResponseSuccess<T> {
    status: true;
    result: T;
    message: string;
}

export interface ApiResponseFailure {
    status: false;
    error: string;
}

// src/utils/apiGuards.ts

export function isApiError<T extends { status: false; error: string }>(
    error: unknown
): error is T {
    return (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        (error as any).status === false &&
        'error' in error &&
        typeof (error as any).error === 'string'
    );
}
