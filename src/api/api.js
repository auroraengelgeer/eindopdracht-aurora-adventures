const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PROJECT_ID = import.meta.env.VITE_NOVI_PROJECT_ID;

if (!BASE_URL) {
    console.warn("VITE_API_BASE_URL ontbreekt in .env");
}
if (!PROJECT_ID) {
    console.warn("VITE_NOVI_PROJECT_ID ontbreekt in .env");
}

export async function apiFetch(endpoint, options = {}, token = "") {
    const headers = {
        "Content-Type": "application/json",
        "novi-education-project-id": PROJECT_ID,
        ...(options.headers || {}),
    };

    // Alleen Authorization meesturen als je écht een token hebt
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("API error:", response.status, response.statusText, errorText);
        throw new Error(`API ${response.status}: ${errorText || response.statusText}`);
    }

    // sommige endpoints kunnen empty body teruggeven
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}
