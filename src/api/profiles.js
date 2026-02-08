import { apiFetch } from "./api";

export function createProfile(payload, token = "") {
    return apiFetch(
        "/api/profiles",
        {
            method: "POST",
            body: JSON.stringify(payload),
        },
        token
    );
}

export function getProfiles(token) {
    return apiFetch("/api/profiles", {}, token);
}
