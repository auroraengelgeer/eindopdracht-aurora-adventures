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

        // MVP: fake login token
        login("demo-token");

        // door naar profiel na login
        navigate("/profiel");
    }

    return (
        <div className="page-container">
            <h1>Inloggen</h1>

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jij@voorbeeld.nl"
                        required
                    />
                </div>

                <div className="field">
                    <label htmlFor="password">Wachtwoord</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
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