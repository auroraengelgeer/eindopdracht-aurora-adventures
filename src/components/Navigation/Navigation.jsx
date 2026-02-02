import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";


export default function Navigation() {

    const { isAuthenticated, logout } = useAuth();

    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/reizen">Reizen</NavLink>
            <NavLink to="/over-ons">Over ons</NavLink>
            <NavLink to="/faq">FAQ</NavLink>

            {!isAuthenticated ? (
                <NavLink to="/inloggen">Log in</NavLink>
            ) : (
                <>
                    <NavLink to="/profiel">Profiel</NavLink>
                    <button type="button" className="nav-logout" onClick={logout}>
                        Uitloggen
                    </button>
                </>
            )}

        </nav>
    );
}
