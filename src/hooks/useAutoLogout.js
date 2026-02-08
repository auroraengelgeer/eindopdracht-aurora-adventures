import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired, getTokenExpiryMs } from "../helpers/jwt";
import { useAuth } from "../context/AuthContext";

export function useAutoLogout() {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return;

        // Als token al verlopen is → direct uitloggen
        if (isTokenExpired(token)) {
            logout();
            navigate("/inloggen", { replace: true, state: { expired: true } });
            return;
        }

        // Tijd tot expiry berekenen
        const timeoutMs = getTokenExpiryMs(token);

        if (!timeoutMs || timeoutMs <= 0) return;

        const timeoutId = setTimeout(() => {
            logout();
            navigate("/inloggen", { replace: true, state: { expired: true } });
        }, timeoutMs);

        // Cleanup
        return () => clearTimeout(timeoutId);
    }, [token, logout, navigate]);
}
