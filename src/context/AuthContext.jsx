import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const isAuthenticated = Boolean(token);

    function login(fakeToken) {
        localStorage.setItem("token", fakeToken);
        setToken(fakeToken);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken("");
    }

    const value = useMemo(
        () => ({ token, isAuthenticated, login, logout }),
        [token, isAuthenticated]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
