import { Link } from "react-router-dom";
import { useState } from "react";
import "./TravelOverview.css";
import { useTravels } from "../../hooks/useTravels";

export default function TravelOverview() {
    const { travels, loading, error } = useTravels();

    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all"); // all | tour | package

    if (loading) return <p>Reizen laden...</p>;
    if (error) return <p>{error}</p>;

    const q = query.trim().toLowerCase();

    const filteredTravels = travels.filter((t) => {
        // tab filter
        const matchesTab =
            activeTab === "all" ||
            (activeTab === "tour" && t.category === "tour") ||
            (activeTab === "package" && t.category === "package");

        if (!matchesTab) return false;

        // search filter
        if (!q) return true;

        const haystack = `${t.title ?? ""} ${t.location ?? ""} ${t.shortDescription ?? ""}`.toLowerCase();
        return haystack.includes(q);
    });

    const sectionTitle =
        activeTab === "tour"
            ? "Tours & Activiteiten"
            : activeTab === "package"
                ? "Vakantiepakketten"
                : "Alle reizen";

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
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <div className="travel-tabs">
                        <button
                            className={`tab ${activeTab === "all" ? "tab-active" : ""}`}
                            type="button"
                            onClick={() => setActiveTab("all")}
                        >
                            Alle reizen
                        </button>

                        <button
                            className={`tab ${activeTab === "tour" ? "tab-active" : ""}`}
                            type="button"
                            onClick={() => setActiveTab("tour")}
                        >
                            Tours & Activiteiten
                        </button>

                        <button
                            className={`tab ${activeTab === "package" ? "tab-active" : ""}`}
                            type="button"
                            onClick={() => setActiveTab("package")}
                        >
                            Vakantiepakketten
                        </button>
                    </div>
                </div>
            </header>

            <section className="travel-section">
                <h2>{sectionTitle}</h2>

                <div className="travel-grid">
                    {filteredTravels.map((t) => (
                        <article className="travel-card" key={t.id}>
                            <div className="travel-card-image">
                                {t.imageUrl ? (
                                    <img className="travel-card-img"
                                         src={t.imageUrl || "/images/placeholder.jpg"}
                                         alt={t.title}
                                         loading="lazy"/>
                                ) : null}
                            </div>


                            <div className="travel-card-body">
                                <h3 className="travel-card-title">{t.title}</h3>

                                <p className="travel-card-meta">
                                    {t.location} • {t.durationDays} {t.durationDays === 1 ? "dag" : "dagen"}
                                </p>

                                <p className="travel-card-price">€{t.pricePerPerson} p.p.</p>

                                <Link className="button button-primary travel-card-cta" to={`/reizen/${t.id}`}>
                                    Bekijk {t.category === "tour" ? "activiteit" : "reis"}
                                </Link>
                            </div>
                        </article>
                    ))}

                    {filteredTravels.length === 0 && (
                        <p style={{opacity: 0.8}}>Geen resultaten gevonden.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
