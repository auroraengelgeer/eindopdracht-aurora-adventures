import { apiFetch } from "./api";

export function createBooking(payload, token) {
    return apiFetch(
        "/api/bookings",
        {
            method: "POST",
            body: JSON.stringify(payload),
        },
        token
    );
}

export function getBookings(token) {
    return apiFetch("/api/bookings", {}, token);
}
