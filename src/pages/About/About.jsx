import "./About.css";

export default function About() {
    return (
        <div className="about">
            <header className="about-hero">
                {/* Optioneel: /public/images/ui/about-hero.jpg */}
                <div className="about-hero-media" aria-hidden="true" />
                <div className="about-hero-overlay" />

                <div className="about-hero-content">
                    <p className="about-kicker">Aurora Adventures</p>
                    <h1>Over ons</h1>
                    <p className="about-subtitle">
                        Betaalbare reizen naar de Malediven — met extra aandacht voor duikers
                        en ladies-only groepen die willen ontspannen.
                    </p>
                </div>
            </header>

            <section className="about-grid">
                <div className="about-card about-card--accent">
                    <h2>Onze missie</h2>
                    <p>
                        Reizen toegankelijk maken met een mix van rust, avontuur en persoonlijke
                        aandacht — zonder gedoe.
                    </p>

                    <div className="about-pill-row">
                        <span className="about-pill">Kleine groepen</span>
                        <span className="about-pill">Budgetvriendelijk</span>
                        <span className="about-pill">Malediven</span>
                    </div>
                </div>

                <div className="about-card">
                    <h2>Wat je kunt verwachten</h2>
                    <ul className="about-list">
                        <li>Duidelijke reisinfo (inclusief & highlights)</li>
                        <li>Vakantiepakketten én losse tours</li>
                        <li>Boeken en beheren via je profiel (demo)</li>
                        <li>Snelle oriëntatie met filters en zoekfunctie</li>
                    </ul>
                </div>

                <div className="about-card">
                    <h2>Waarom dit project?</h2>
                    <p>
                        Dit is een front-end eindopdracht (Novi) waarin een reserveringssysteem is
                        gebouwd met login, reizen-overzicht, detailpagina’s, boeken en profiel.
                    </p>
                </div>

                <div className="about-card">
                    <h2>Contact</h2>
                    <p className="about-muted">
                        Demo: voeg hier later echte gegevens toe (of toon ze in de footer).
                    </p>
                    <div className="about-contact">
                        <div>
                            <span className="about-label">E-mail</span>
                            <span>info@auroraadventures.nl</span>
                        </div>
                        <div>
                            <span className="about-label">Locatie</span>
                            <span>Nederland / Malediven</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
