import type { User } from "./user";

export interface RegisterFormData {
    name: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export type ProfileFormData = Pick<User, 'username' | 'description'>