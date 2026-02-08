import { apiFetch } from "./api";

export function loginRequest(email, password) {
    return apiFetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}
