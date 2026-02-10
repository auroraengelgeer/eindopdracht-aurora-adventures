import { formatPriceEUR } from "../../helpers/format";

export default function BookingSummaryCard({
                                               travel,
                                               subtitle,
                                               guests,
                                               pricePerPerson,
                                               subtotal,
                                               serviceFee,
                                               total,
                                           }) {
    return (
        <aside className="booking-summary-card">
            <div className="summary-image" aria-label="Reis afbeelding" />
            <h3>{travel?.title}</h3>
            <p className="summary-sub">{subtitle}</p>

            <div className="summary-row">
                <span>{formatPriceEUR(pricePerPerson)} × {guests} gasten</span>
                <span>{formatPriceEUR(subtotal)}</span>
            </div>

            <div className="summary-row">
                <span>Servicekosten</span>
                <span>{formatPriceEUR(serviceFee)}</span>
            </div>

            <div className="summary-total">
                <span>Totaal</span>
                <span>{formatPriceEUR(total)}</span>
            </div>

            <div className="summary-safe">
                <span>✓</span>
                <p>
                    <strong>Veilig betalen</strong><br />
                    Je gegevens zijn beschermd
                </p>
            </div>
        </aside>
    );
}
