import { Link, useParams } from "react-router-dom";
import { useTravels } from "../../hooks/useTravels";
import "./TravelDetail.css";

export default function TravelDetail() {
    const { travelId } = useParams();
    const { travels, loading, error } = useTravels();

    if (loading) {
        return (
            <div className="travel-detail">
                <p>Reis laden...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="travel-detail">
                <p>{error}</p>
                <Link to="/reizen" className="button button-secondary">
                    Terug naar overzicht
                </Link>
            </div>
        );
    }

    const travel = travels.find((t) => String(t.id) === String(travelId));

    if (!travel) {
        return (
            <div className="travel-detail">
                <p>Reis niet gevonden.</p>
                <Link to="/reizen" className="button button-secondary">
                    Terug naar overzicht
                </Link>
            </div>
        );
    }

    return (
        <div className="travel-detail">
            <header className="travel-detail-hero">
                <Link className="back-link" to="/reizen">← Terug naar overzicht</Link>
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
                            <span>{travel.durationDays} dagen</span>
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
                        <p className="booking-price">€{travel.pricePerPerson}</p>
                        <p className="booking-sub">per persoon</p>

                        <Link className="button button-primary booking-cta" to={`/reserveren/${travel.id}`}>
                            Boek nu
                        </Link>

                        <p className="booking-note">Je wordt pas in rekening gebracht na bevestiging.</p>
                    </div>
                </aside>
            </section>
        </div>
    );
}
