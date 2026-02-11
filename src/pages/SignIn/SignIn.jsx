import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import "./SignIn.css";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [passwordError, setPasswordError] = useState("");

    const { loginWithCredentials } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [expiredNotice, setExpiredNotice] = useState(false);
    const [signupNotice, setSignupNotice] = useState(false);

    const redirectTo = location.state?.from?.pathname || "/profiel";

    useEffect(() => {
        const expired = Boolean(location.state?.expired);
        const signupSuccess = Boolean(location.state?.signupSuccess);
        const signupEmail = location.state?.email || "";

        if (expired) setExpiredNotice(true);
        if (signupSuccess) setSignupNotice(true);

        if (signupSuccess && signupEmail) {
            setEmail(signupEmail);
        }

        if (expired || signupSuccess) {
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        setPasswordError("");


        try {
            await loginWithCredentials(email, password);
            navigate(redirectTo, { replace: true });
        } catch (err) {
            console.error("Login failed:", err);
            setPasswordError("E-mail of wachtwoord is onjuist.");
        }

    }

    return (
        <AuthLayout
            leftClassName="auth-left"
            leftTitle="Welkom terug!"
            leftText="In deze persoonlijke reisomgeving vind je jouw geboekte reizen en activiteiten. Laat de voorpret vast beginnen!"
            rightInnerClassName="auth-card"
        >
            <h2 className="auth-title">Log in</h2>

            {expiredNotice && (
                <div className="auth-alert">
                    Je sessie is verlopen. Log opnieuw in.
                </div>
            )}

            {signupNotice && (
                <div className="auth-alert auth-alert--success">
                    Je account is aangemaakt. Log hieronder in met je e-mail en wachtwoord.
                </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="email">Email adres</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="jij@voorbeeld.nl"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setPasswordError("");
                        }}
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
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError("");
                        }}
                        required
                    />

                    {passwordError ? <p className="field-error">{passwordError}</p> : null}

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
        </AuthLayout>
    );
}
