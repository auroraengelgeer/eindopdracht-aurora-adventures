import { useEffect, useMemo, useState } from "react";
import { getBookings, deleteBooking } from "../api/bookings";
import { isJwtToken } from "../helpers/isJwtToken";

export function useMyBookings(userEmail, token) {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchBookings() {
            try {
                setLoading(true);
                setError("");

                const jwt = isJwtToken(token) ? token : "";
                const data = await getBookings(jwt);
                setBookings(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error("Bookings ophalen mislukt:", e);
                setError("Boekingen ophalen mislukt.");
                setBookings([]);
            } finally {
                setLoading(false);
            }
        }

        fetchBookings();
    }, [token]);

    const myBookings = useMemo(() => {
        if (!userEmail) return [];
        return bookings.filter((b) => b.userEmail === userEmail);
    }, [bookings, userEmail]);

    async function removeBooking(id) {
        const jwt = isJwtToken(token) ? token : "";
        await deleteBooking(id, jwt);
        setBookings((prev) => prev.filter((b) => b.id !== id));
    }

    return { myBookings, loading, error, removeBooking };
}
