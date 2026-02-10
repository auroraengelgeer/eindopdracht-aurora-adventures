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
        const expMs = getTokenExpiryMs(token);
        const timeoutMs = expMs - Date.now();

        if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
            logout();
            navigate("/inloggen", { replace: true, state: { expired: true } });
            return;
        }

        const timeoutId = setTimeout(() => {
            logout();
            navigate("/inloggen", { replace: true, state: { expired: true } });
        }, timeoutMs);

        // Cleanup
        return () => clearTimeout(timeoutId);
    }, [token, logout, navigate]);
}
