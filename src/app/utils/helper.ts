import { redirect } from "react-router-dom";

export function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export async function checkAuthLoader() {
    // TODO Complete the function types
    console.log('We are checking auth...');
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw redirect('/login');
    }

    try {

        const user = await Promise.resolve({});
        return { user };

    } catch (error) {
        localStorage.removeItem('authToken');
        console.error(error);
        throw redirect('/login');
    }
}