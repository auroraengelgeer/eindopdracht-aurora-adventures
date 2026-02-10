export function formatDurationDays(days) {
    const n = Number(days);
    if (!Number.isFinite(n) || n <= 0) return "";
    return `${n} ${n === 1 ? "dag" : "dagen"}`;
}

export function formatPriceEUR(amount) {
    const n = Number(amount);
    if (!Number.isFinite(n)) return "";
    return new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(n);
}

export function formatDateNL(iso) {
    if (!iso) return "Geen datum";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "Geen datum";
    return new Intl.DateTimeFormat("nl-NL", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(d);
}
