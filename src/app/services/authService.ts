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

    if (!response.ok) {

        throw data;
    }

    return data;
}
