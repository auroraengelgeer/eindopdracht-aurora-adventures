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
