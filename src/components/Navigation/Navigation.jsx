
import { NavLink } from "react-router-dom";

export default function Navigation() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/reizen">Reizen</NavLink>
            <NavLink to="/over-ons">Over ons</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/inloggen">Log in</NavLink>
        </nav>
    );
}
