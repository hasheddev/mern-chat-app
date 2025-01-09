import { ReactNode } from "react"


export type SignUpData = {
    email: string;
    password: string;
    comfirmPassword: string;
    firstName: string;
    lastName: string;
    userName: string;
}

export type User = {
    _id: string,
    userName: string,
    email: string,
    firstName?: string,
    lastName?: string,
    password: string,
    profile: string,
    contacts?: string[],
    lastSeen?: Date
}

export type Props = {
    children: ReactNode
}

export interface ErrorMessage {
    message: string,
}
