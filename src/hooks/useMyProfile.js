import { useEffect, useState } from "react";
import { getProfiles } from "../api/profiles";
import { isJwtToken } from "../helpers/isJwtToken";

export function useMyProfile(userEmail, token) {
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [profileError, setProfileError] = useState("");

    useEffect(() => {
        async function fetchProfile() {
            if (!userEmail) {
                setProfile(null);
                setLoadingProfile(false);
                return;
            }

            try {
                setLoadingProfile(true);
                setProfileError("");

                const jwt = isJwtToken(token) ? token : "";
                const profiles = await getProfiles(jwt);

                const mine = Array.isArray(profiles)
                    ? profiles.find((p) => p.email === userEmail)
                    : null;

                setProfile(mine || null);
            } catch (e) {
                console.error("Profiel ophalen mislukt:", e);
                setProfileError("Profiel ophalen mislukt.");
                setProfile(null);
            } finally {
                setLoadingProfile(false);
            }
        }

        fetchProfile();
    }, [userEmail, token]);

    return { profile, loadingProfile, profileError };
}
