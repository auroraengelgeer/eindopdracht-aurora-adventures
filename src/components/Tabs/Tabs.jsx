export default function Tabs({ value, onChange, options = [] }) {
    return (
        <div className="travel-tabs">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    className={`tab ${value === opt.value ? "tab-active" : ""}`}
                    type="button"
                    onClick={() => onChange(opt.value)}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}
