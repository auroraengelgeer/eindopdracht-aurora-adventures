import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    function handleSubmit(e) {
        e.preventDefault();

        //demo login
        login("demo-token");

        navigate("/profiel");
    }

    return (
        <div className="page-container">
            <h1>Inloggen</h1>

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="email">E-mail *</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="jan@voorbeeld.nl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="field">
                    <label htmlFor="password">Wachtwoord *</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button className="button button-primary" type="submit">
                    Inloggen
                </button>
            </form>
        </div>
    );
}
