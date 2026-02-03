import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";


export default function Profile() {

    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/");
    }


    return (
        <div className="page-container">
            <h1>Mijn profiel</h1>
            <p>Welkom op je profielpagina.</p>

            <button
                className="button button-secondary"
                type="button"
                onClick={handleLogout}
            >
                Uitloggen
            </button>
        </div>
    );

}