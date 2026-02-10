import { Link } from "react-router-dom";
import { formatDurationDays, formatPriceEUR } from "../../helpers/format";

export default function TravelCard({ travel }) {
    const duration = formatDurationDays(travel?.durationDays);
    const price = formatPriceEUR(travel?.pricePerPerson);

    return (
        <article className="travel-card">
            <div className="travel-card-image">
                {travel?.imageUrl ? (
                    <img
                        className="travel-card-img"
                        src={travel.imageUrl || "/images/placeholder.jpg"}
                        alt={travel?.title ?? "Reis"}
                        loading="lazy"
                    />
                ) : null}
            </div>

            <div className="travel-card-body">
                <h3 className="travel-card-title">{travel?.title}</h3>

                <p className="travel-card-meta">
                    {travel?.location}
                    {duration ? ` • ${duration}` : ""}
                </p>

                <p className="travel-card-price">
                    {price ? `${price} p.p.` : ""}
                </p>

                <Link className="button button-primary travel-card-cta" to={`/reizen/${travel?.id}`}>
                    Bekijk {travel?.category === "tour" ? "activiteit" : "reis"}
                </Link>
            </div>
        </article>
    );
}
