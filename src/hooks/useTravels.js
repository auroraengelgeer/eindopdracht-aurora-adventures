import {useEffect, useState} from "react";
import {apiFetch} from "../api/api";

export function useTravels() {
    const [travels, setTravels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTravels() {
            try {
                const data = await apiFetch("/api/travels");
                setTravels(data);
            } catch (err) {
                console.error("useTravels error:", err);
                setError(err.message || "Kon reizen niet laden");

            } finally {
                setLoading(false);
            }
        }

        fetchTravels();
    }, []);

    return {travels, loading, error};
}
