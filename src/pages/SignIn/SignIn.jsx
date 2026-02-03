import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./SignIn.css";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const location = useLocation();
    const redirectTo = location.state?.from?.pathname || "/profiel";


    function handleSubmit(e) {
        e.preventDefault();

        // demo login
        login("demo-token");
        navigate(redirectTo);
    }

    return (
        <div className="auth-page">
            {/* LINKS */}
            <section className="auth-left">
                <div className="auth-left-overlay">
                    <h1 className="auth-left-title">Welkom terug!</h1>
                    <p className="auth-left-text">
                        In deze persoonlijke reisomgeving vind je jouw geboekte reizen en
                        activiteiten. Laat de voorpret vast beginnen!
                    </p>
                </div>
            </section>

            {/* RECHTS */}
            <section className="auth-right">
                <div className="auth-card">
                    <h2 className="auth-title">Log in</h2>

                    <form className="auth-form" onSubmit={handleSubmit}>
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
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button className="button button-primary auth-submit" type="submit">
                            Log in
                        </button>
                    </form>

                    <p className="auth-bottom-text">
                        Heb je nog geen account?{" "}
                        <Link className="auth-link" to="/registreren">
                            Registreer hier.
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    );
}
