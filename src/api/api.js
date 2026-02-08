const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PROJECT_ID = import.meta.env.VITE_NOVI_PROJECT_ID;

export async function apiFetch(endpoint, options = {}, token) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "novi-education-project-id": PROJECT_ID,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("API error:", response.status, response.statusText, errorText);
        throw new Error(`API ${response.status}: ${errorText || response.statusText}`);
    }

    return response.json();
}
