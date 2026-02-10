import { createContext, useContext, useMemo, useState } from "react";
import { loginRequest } from "../api/auth";
import { isTokenExpired } from "../helpers/jwt";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const isAuthenticated = Boolean(token) && !isTokenExpired(token);

    async function loginWithCredentials(email, password) {
        const data = await loginRequest(email, password);

        const receivedToken = data?.token || "";
        const userData = data?.user || null;

        login(receivedToken, userData);
        return data;
    }

    function login(newToken, userData = null) {
        localStorage.setItem("token", newToken);
        setToken(newToken);

        if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
        } else {
            localStorage.removeItem("user");
            setUser(null);
        }
    }



    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken("");
        setUser(null);
    }


    const value = useMemo(
        () => ({ token, isAuthenticated, user, login, loginWithCredentials, logout }),
        [token, isAuthenticated, user]
    );



    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
