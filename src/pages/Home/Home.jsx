import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
    return (
        <div className="home">
            <header className="home-hero">
                <h1 className="home-title">
                    Jouw Volgende Avontuur <br />
                    Start <span className="home-accent">Hier</span>.
                </h1>

                <p className="home-subtitle">
                    Aurora Adventures brengt je naar unieke bestemmingen, met een mix van
                    ontspanning en avontuur – jij kiest, wij verzorgen.
                </p>

                <Link className="button button-secondary home-cta" to="/reizen">
                    Bekijk reizen
                </Link>
            </header>

            <section className="home-image-section">
                <div className="home-image" aria-label="Tropisch strand" />
            </section>
        </div>
    );
}
