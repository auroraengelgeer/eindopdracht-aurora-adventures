import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";

export function useTravel(travelId) {
    const [travel, setTravel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!travelId) return;

        async function fetchTravel() {
            try {
                setLoading(true);
                setError(null);

                const data = await apiFetch(`/api/travels/${travelId}`);
                setTravel(data);
            } catch (err) {
                console.error("useTravel error:", err);
                setError(err.message || "Kon reis niet laden");
            } finally {
                setLoading(false);
            }
        }

        fetchTravel();
    }, [travelId]);

    return { travel, loading, error };
}
