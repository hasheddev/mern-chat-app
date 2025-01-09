import React, { useContext, useState, useEffect } from "react";
import { type User, type Props } from "../types";
import { getUserStatus } from "../apiClient";

type UserContext = {
    setLogin: (newStatus: boolean) => void;
    user: User | undefined;
    isLoggedIn: boolean;
    setUser: (user: User) => void;
}

const UserContext = React.createContext<UserContext | undefined>(undefined);

export const UserContextProvider = ({ children }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User|undefined>(undefined);

   useEffect(() => {
        async function getStatus() {
            const status = await getUserStatus();
            setIsLoggedIn(status);
        }
        getStatus();
   }, [isLoggedIn]);

    return (
        <UserContext.Provider value={{
            setLogin: (newStatus) => { setIsLoggedIn(newStatus) },
            user,
            isLoggedIn,
            setUser: (user) => { setUser(user) },
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const userContext = useContext(UserContext) as UserContext;
    return  userContext;
}
