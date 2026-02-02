import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";


export default function SignUp() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    function handleSubmit(e) {
        e.preventDefault();

        login("demo-token");

        navigate("/profiel");
    }

    return (
        <div className="page-container">
            <h1>Registreren</h1>

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="firstName">Voornaam *</label>
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
                    <label htmlFor="lastName">Achternaam *</label>
                    <input
                        id="lastName"
                        type="text"
                        placeholder="de Vries"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>

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
                        minLength={6}
                    />
                </div>

                <button className="button button-primary" type="submit">
                    Registreren
                </button>
            </form>
        </div>
    );

}