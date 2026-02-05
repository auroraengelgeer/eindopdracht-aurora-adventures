import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Profile.css";

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="profile">
            <header className="profile-hero">
                <h1>Mijn profiel</h1>
                <p>Beheer je gegevens en bekijk je (toekomstige) boekingen.</p>
            </header>

            <section className="profile-grid">
                <div className="profile-card">
                    <h2>Gegevens</h2>

                    <div className="profile-row">
                        <span>Naam</span>
                        <span>
              {user?.firstName} {user?.lastName}
            </span>
                    </div>

                    <div className="profile-row">
                        <span>E-mail</span>
                        <span>{user?.email}</span>
                    </div>

                    <div className="profile-actions">
                        <button className="button button-secondary" type="button" disabled>
                            Gegevens wijzigen (later)
                        </button>
                    </div>
                </div>

                <div className="profile-card">
                    <h2>Mijn boekingen</h2>

                    <div className="profile-empty">
                        <p>Je hebt nog geen boekingen.</p>
                        <Link className="button button-primary" to="/reizen">
                            Bekijk reizen
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
