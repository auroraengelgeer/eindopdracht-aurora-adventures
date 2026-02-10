import { apiFetch } from "./api";

export function createUser(payload) {
    return apiFetch("/api/users", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
