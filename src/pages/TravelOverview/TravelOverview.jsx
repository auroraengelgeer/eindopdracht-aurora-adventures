import { Link } from "react-router-dom";
import { dummyTravels } from "../../helpers/dummyTravels.js";
import "./TravelOverview.css";

export default function TravelOverview() {
    return (
        <div className="travel-overview">
            <header className="travel-hero">
                <h1>Onze reizen</h1>
                <p>Ontdek vakantiepakketten en tours die perfect passen bij jouw avontuur.</p>

                <div className="travel-controls">
                    <input
                        className="travel-search"
                        type="text"
                        placeholder="Zoek bestemming, activiteit..."
                    />

                    <div className="travel-tabs">
                        <button className="tab tab-active" type="button">Alle reizen</button>
                        <button className="tab" type="button">Tours & Activiteiten</button>
                        <button className="tab" type="button">Vakantiepakketten</button>
                    </div>
                </div>
            </header>

            <section className="travel-section">
                <h2>Reizen</h2>

                <div className="travel-grid">
                    {dummyTravels.map((t) => (
                        <article className="travel-card" key={t.id}>
                            <div className="travel-card-image" />

                            <div className="travel-card-body">
                                <h3 className="travel-card-title">{t.title}</h3>
                                <p className="travel-card-meta">
                                    {t.location} • {t.durationDays} dagen
                                </p>
                                <p className="travel-card-price">€{t.pricePerPerson} p.p.</p>

                                <Link className="button button-primary" to={`/reizen/${t.id}`}>
                                    Bekijk reis
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
