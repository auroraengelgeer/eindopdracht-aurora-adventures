import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import heroImage from "../../assets/images/login-page-image.jpg";
import "./SignUp.css";

export default function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        // registratie = direct ingelogd
        login("demo-token");
        navigate("/profiel");
    }

    return (
        <div className="auth-page">
            {/* LINKS */}
            <section
                className="auth-left"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                <div className="auth-left-overlay">
                    <h1>Maak je account aan</h1>
                    <p>
                        Sla je gegevens op, beheer boekingen en rond je reservering sneller
                        af.
                    </p>
                </div>
            </section>

            {/* RECHTS */}
            <section className="auth-right">
                <div className="auth-form-wrapper">
                    <h2 className="auth-title">Registreren</h2>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="grid-2">
                            <div className="field">
                                <label htmlFor="firstName">Voornaam</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="Jan"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="lastName">Achternaam</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="de Vries"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="email">Email adres</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="jij@voorbeeld.nl"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="password">Wachtwoord</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Minimaal 6 tekens"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>

                        <button className="button button-primary auth-submit" type="submit">
                            Account aanmaken
                        </button>
                    </form>

                    <p className="auth-bottom-text">
                        Heb je al een account?{" "}
                        <Link className="auth-link" to="/inloggen">
                            Log in
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    );
}
