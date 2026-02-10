export default function SearchInput({ value, onChange, placeholder = "Zoeken..." }) {
    return (
        <input
            className="travel-search"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
