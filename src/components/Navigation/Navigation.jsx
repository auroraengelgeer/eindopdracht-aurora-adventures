import "./Navigation.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Navigation({ variant = "default" }) {

    const { isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();


    return (
        <nav className={variant === "auth" ? "nav nav--auth" : "nav"}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/reizen">Reizen</NavLink>
            <NavLink to="/over-ons">Over ons</NavLink>
            <NavLink to="/faq">FAQ</NavLink>

            {!isAuthenticated ? (
                <NavLink to="/inloggen">Log in</NavLink>
            ) : (
                <>
                    <NavLink to="/profiel">Profiel</NavLink>
                    <button
                        type="button"
                        className="nav-logout"
                        onClick={() => {
                            logout();
                            navigate("/inloggen", {replace: true});
                        }}
                    >
                        Uitloggen
                    </button>

                </>
            )}
        </nav>
    );
}
