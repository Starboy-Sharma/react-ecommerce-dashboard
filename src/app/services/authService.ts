import type { LoginResult } from "../types/admin";
import type { ApiResponseFailure, ApiResponseSuccess } from "../types/api";

export async function loginAdmin(
    email: string,
    password: string
): Promise<ApiResponseSuccess<LoginResult> | ApiResponseFailure> {
    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json() as ApiResponseSuccess<LoginResult> | ApiResponseFailure;
    data.responseStatus = response.status;

    if (!response.ok) {
        throw data;
    }

    return data;
}


export async function getUser(): Promise<ApiResponseSuccess<LoginResult> | ApiResponseFailure> {
    const token = localStorage.getItem('authToken') || '';

    const response = await fetch('http://localhost:5000/auth', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    const data = await response.json() as ApiResponseSuccess<LoginResult> | ApiResponseFailure;
    data.responseStatus = response.status;

    if (!response.ok) {
        throw data;
    }

    return data;
}
