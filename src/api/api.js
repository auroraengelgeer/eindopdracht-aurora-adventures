const BASE_URL = "https://novi-backend-api-wgsgz.ondigitalocean.app";

export async function apiFetch(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "novi-education-project-id": "e8f5301b-5b8b-4f17-af36-2a6073dc22da",
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("API error:", response.status, response.statusText, errorText);
        throw new Error(`API ${response.status}: ${errorText || response.statusText}`);
    }
    // to do : voeg nog een error message voor klant toe in return error message.
    return response.json();
}
