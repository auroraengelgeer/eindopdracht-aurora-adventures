import { Link, useParams } from "react-router-dom";
import { useTravel } from "../../hooks/useTravel";
import { useState } from "react";
import "./TravelDetail.css";
import PageState from "../../components/PageState/PageState";
import GuestSelector from "../../components/GuestSelector/GuestSelector";
import { formatDurationDays, formatPriceEUR } from "../../helpers/format";


export default function TravelDetail() {
    const { travelId } = useParams();
    const { travel, loading, error } = useTravel(travelId);
    const [guests, setGuests] = useState(2);

    if (loading) {
        return (
            <PageState
                className="travel-detail"
                message="Reis laden..."
            />
        );
    }

    if (error) {
        return (
            <PageState
                className="travel-detail"
                message={error}
                actionTo="/reizen"
                actionLabel="Terug naar overzicht"
            />
        );
    }

    if (!travel) {
        return (
            <PageState
                className="travel-detail"
                message="Reis niet gevonden."
                actionTo="/reizen"
                actionLabel="Terug naar overzicht"
            />
        );
    }

    return (
        <div className="travel-detail">
            <header className="travel-detail-hero">
                {travel.imageUrl ? (
                    <img
                        className="travel-detail-hero-img"
                        src={travel.imageUrl}
                        alt={travel.title}
                    />
                ) : null}

                <Link className="back-link" to="/reizen">
                    ← Terug naar overzicht
                </Link>
            </header>


            <section className="travel-detail-content">
                <div className="travel-detail-main">
                    <div className="travel-detail-card">
                        <p className="travel-badge">
                            {travel.category === "package" ? "Vakantiepakket" : "Tour / Activiteit"}
                        </p>

                        <h1 className="travel-title">{travel.title}</h1>
                        <p className="travel-location">{travel.location}</p>

                        <div className="travel-meta">
                            <span>{formatDurationDays(travel.durationDays)}</span>
                        </div>
                    </div>

                    <div className="travel-detail-card">
                        <h2>Over deze reis</h2>
                        <p>{travel.longDescription}</p>
                    </div>

                    <div className="travel-detail-card">
                        <h2>Hoogtepunten</h2>
                        <ul className="travel-list">
                            {travel.highlights?.map((h) => (
                                <li key={h}>{h}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="travel-detail-card">
                        <h2>Inclusief</h2>
                        <ul className="travel-list">
                            {travel.included?.map((i) => (
                                <li key={i}>{i}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <aside className="travel-detail-aside">
                    <div className="booking-card">
                        <p className="booking-price">{formatPriceEUR(travel.pricePerPerson)}</p>
                        <p className="booking-sub">per persoon</p>

                        <div className="booking-guests">
                            <p className="booking-guests-label">Aantal gasten</p>
                            <GuestSelector
                                value={guests}
                                onChange={setGuests}
                                min={1}
                                label=""
                                countClassName="guest-count"
                            />
                        </div>


                        <Link
                            className="button button-primary booking-cta"
                            to={`/reserveren/${travel.id}`}
                            state={{guests}}
                        >
                            Boek nu
                        </Link>


                        <p className="booking-note">Je wordt pas in rekening gebracht na bevestiging.</p>
                    </div>
                </aside>
            </section>
        </div>
    );
}
