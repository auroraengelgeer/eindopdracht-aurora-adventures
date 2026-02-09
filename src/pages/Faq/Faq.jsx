import "./Faq.css";

const FAQ_ITEMS = [
    {
        q: "Hoe werkt boeken?",
        a: "Kies een reis of activiteit, klik op ‘Boek nu’ en rond de stappen af. Je ziet direct een bevestiging in je profiel.",
    },
    {
        q: "Kan ik het aantal gasten later aanpassen?",
        a: "Ja. In het boekingsformulier kun je het aantal gasten nog wijzigen vóór je bevestigt.",
    },
    {
        q: "Hoe werkt betaling?",
        a: "Dit is een demo-omgeving. Er wordt geen echte betaling uitgevoerd. In een echte versie koppel je een betaalprovider (bijv. Mollie/Stripe).",
    },
    {
        q: "Kan ik annuleren?",
        a: "In deze demo is annuleren nog niet gebouwd. In een echte versie voeg je annuleren toe met voorwaarden per reis.",
    },
    {
        q: "Ik heb een vraag die hier niet staat",
        a: "Stuur een bericht via de contactgegevens in de footer (demo) of neem contact op via e-mail.",
    },
];

export default function FAQ() {
    return (
        <div className="faq">
            <header className="faq-hero">
                {/* Optioneel: zet een afbeelding in /public/images/ui/faq-hero.jpg */}
                <div className="faq-hero-media" aria-hidden="true" />
                <div className="faq-hero-overlay" />

                <div className="faq-hero-content">
                    <p className="faq-kicker">Hulp & info</p>
                    <h1>FAQ</h1>
                    <p className="faq-subtitle">
                        De meestgestelde vragen over reizen, tours en boekingen.
                    </p>
                </div>
            </header>

            <section className="faq-grid">
                {FAQ_ITEMS.map((item) => (
                    <details className="faq-item" key={item.q}>
                        <summary className="faq-question">
                            <span>{item.q}</span>
                            <span className="faq-icon" aria-hidden="true" />
                        </summary>
                        <div className="faq-answer">
                            <p>{item.a}</p>
                        </div>
                    </details>
                ))}
            </section>
        </div>
    );
}
