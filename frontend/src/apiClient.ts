import { type User, ErrorMessage, SignUpData } from "./types";

const API_URL = import.meta.env.VITE_API_BASE_URL || "";

export const registerUser = async (formData: SignUpData): Promise<User | ErrorMessage> => {
    const response = await fetch(`${API_URL}/api/users/register`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data;
}

export const signIn = async (formData: {email: string, password: string}): Promise<User | ErrorMessage> => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data;
}

export const getUserStatus = async (): Promise<boolean> => {
    const response = await fetch(`${API_URL}/api/users/status`, {credentials: "include", method: "GET"});
    if (!response.ok){
        return false;
    }
    return true;
}