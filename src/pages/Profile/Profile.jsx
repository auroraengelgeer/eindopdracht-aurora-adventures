// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext.jsx";
//
//
// export default function Profile() {
//
//     const { logout } = useAuth();
//     const navigate = useNavigate();
//
//     function handleLogout() {
//         logout();
//         navigate("/");
//     }
//
//
//     return (
//         <div className="page-container">
//             <h1>Mijn profiel</h1>
//             <p>Welkom op je profielpagina.</p>
//
//             <button
//                 className="button button-secondary"
//                 type="button"
//                 onClick={handleLogout}
//             >
//                 Uitloggen
//             </button>
//         </div>
//     );
//
// }

import { useAuth } from "../../context/AuthContext.jsx";
import "./Profile.css";

export default function Profile() {
    const { user, logout } = useAuth();

    return (
        <div className="profile">
            <header className="profile-header">
                <h1>Mijn profiel</h1>
                <p>Beheer je gegevens en bekijk je boekingen.</p>
            </header>

            <section className="profile-grid">
                <div className="profile-card">
                    <h2>Gegevens</h2>
                    <p><strong>Naam:</strong> {user?.firstName} {user?.lastName}</p>
                    <p><strong>Email:</strong> {user?.email}</p>

                    <button className="button button-secondary" type="button" onClick={logout}>
                        Uitloggen
                    </button>
                </div>

                <div className="profile-card">
                    <h2>Mijn boekingen</h2>
                    <p>Je hebt nog geen boekingen.</p>
                </div>
            </section>
        </div>
    );
}
