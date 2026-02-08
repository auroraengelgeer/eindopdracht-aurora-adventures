export function isJwtToken(token) {
    if (typeof token !== "string") return false;

    // JWT = header.payload.signature
    const parts = token.split(".");
    return parts.length === 3 && parts.every(Boolean);
}
