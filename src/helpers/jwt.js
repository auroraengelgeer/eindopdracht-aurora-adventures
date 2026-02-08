export function decodeJwtPayload(token) {
    try {
        const [, payload] = token.split(".");
        if (!payload) return null;

        // base64url -> base64
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const json = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
                .join("")
        );

        return JSON.parse(json);
    } catch {
        return null;
    }
}

export function getTokenExpiryMs(token) {
    const payload = decodeJwtPayload(token);
    if (!payload?.exp) return null; // exp is in seconds
    return payload.exp * 1000;
}

export function isTokenExpired(token) {
    const expMs = getTokenExpiryMs(token);
    if (!expMs) return true;
    return Date.now() >= expMs;
}
