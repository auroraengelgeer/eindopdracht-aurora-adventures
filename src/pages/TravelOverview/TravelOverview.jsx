import { useMemo, useState } from "react";
import "./TravelOverview.css";
import { useTravels } from "../../hooks/useTravels";

import SearchInput from "../../components/SearchInput/SearchInput";
import Tabs from "../../components/Tabs/Tabs";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import TravelCard from "../../components/TravelCard/TravelCard";

export default function TravelOverview() {
    const { travels, loading, error } = useTravels();

    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all"); // all | tour | package

    const tabOptions = useMemo(
        () => [
            { value: "all", label: "Alle reizen" },
            { value: "tour", label: "Tours & Activiteiten" },
            { value: "package", label: "Vakantiepakketten" },
        ],
        []
    );

    const sectionTitle =
        activeTab === "tour"
            ? "Tours & Activiteiten"
            : activeTab === "package"
                ? "Vakantiepakketten"
                : "Alle reizen";

    const filteredTravels = useMemo(() => {
        const q = query.trim().toLowerCase();

        return (travels ?? []).filter((t) => {
            const matchesTab =
                activeTab === "all" ||
                (activeTab === "tour" && t.category === "tour") ||
                (activeTab === "package" && t.category === "package");

            if (!matchesTab) return false;
            if (!q) return true;

            const haystack = `${t.title ?? ""} ${t.location ?? ""} ${t.shortDescription ?? ""}`.toLowerCase();
            return haystack.includes(q);
        });
    }, [travels, query, activeTab]);

    return (
        <div className="travel-overview">
            <header className="travel-hero">
                <h1>Onze reizen</h1>
                <p>Ontdek vakantiepakketten en tours die perfect passen bij jouw avontuur.</p>

                <div className="travel-controls">
                    <SearchInput
                        value={query}
                        onChange={setQuery}
                        placeholder="Zoek bestemming, activiteit..."
                    />

                    <Tabs value={activeTab} onChange={setActiveTab} options={tabOptions} />
                </div>
            </header>

            <section className="travel-section">
                <h2>{sectionTitle}</h2>

                {loading && <StatusMessage>Reizen laden...</StatusMessage>}
                {error && <StatusMessage>{error}</StatusMessage>}

                {!loading && !error && (
                    <div className="travel-grid">
                        {filteredTravels.map((t) => (
                            <TravelCard key={t.id} travel={t} />
                        ))}

                        {filteredTravels.length === 0 && (
                            <StatusMessage>Geen resultaten gevonden.</StatusMessage>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}
