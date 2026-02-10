export default function GuestSelector({
                                          value,
                                          onChange,
                                          min = 1,
                                          label = "Aantal gasten",
                                          countClassName = "",
                                      }) {
    return (
        <div className="field">
            <label>{label}</label>

            <div className="guest-row">
                <button
                    type="button"
                    className="guest-btn"
                    onClick={() => onChange(Math.max(min, value - 1))}
                >
                    -
                </button>

                <span className={countClassName}>{value}</span>

                <button
                    type="button"
                    className="guest-btn"
                    onClick={() => onChange(value + 1)}
                >
                    +
                </button>
            </div>
        </div>
    );
}
