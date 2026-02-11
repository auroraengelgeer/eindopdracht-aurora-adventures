import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { formatDateNL, formatPriceEUR } from "../../helpers/format";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import { useMyBookings } from "../../hooks/useMyBookings";
import { useMyProfile } from "../../hooks/useMyProfile";
import "./Profile.css";

export default function Profile() {
    const { user, token } = useAuth();

    const { myBookings, loading, error, removeBooking } = useMyBookings(user?.email, token);
    const { profile, loadingProfile, profileError } = useMyProfile(user?.email, token);

    async function handleDeleteBooking(id) {
        const confirmDelete = window.confirm("Weet je zeker dat je deze boeking wilt verwijderen?");
        if (!confirmDelete) return;

        try {
            await removeBooking(id);
        } catch (e) {
            console.error("Boeking verwijderen mislukt:", e);
            alert("Verwijderen mislukt. Probeer opnieuw.");
        }
    }

    const sortedBookings = myBookings
        .slice()
        .sort((a, b) => {
            const da = new Date(a.createdAt || 0).getTime();
            const db = new Date(b.createdAt || 0).getTime();
            return db - da; // nieuwste bovenaan
        });

    const displayName = profile
        ? `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim()
        : "";

    return (
        <div className="profile">
            <header className="profile-hero">
                <h1>
                    {loadingProfile
                        ? "Mijn profiel"
                        : displayName
                            ? `Hallo, ${displayName}`
                            : "Mijn profiel"}
                </h1>
                <p>Beheer je gegevens en bekijk je (toekomstige) boekingen.</p>
            </header>


            <section className="profile-grid">
                <div className="profile-card">
                    <h2>Gegevens</h2>

                    <div className="profile-row">
                        <span>Naam</span>
                        <span>
                            {loadingProfile ? "Laden..." : displayName || "—"}
                        </span>
                    </div>

                    <div className="profile-row">
                        <span>E-mail</span>
                        <span>{user?.email}</span>
                    </div>

                    {profileError ? <StatusMessage>{profileError}</StatusMessage> : null}
                </div>

                <div className="profile-card">
                    <h2>Mijn boekingen</h2>

                    {loading && <StatusMessage>Boekingen laden...</StatusMessage>}
                    {error && <StatusMessage>{error}</StatusMessage>}

                    {!loading && !error && sortedBookings.length === 0 ? (
                        <div className="profile-empty">
                            <p>Je hebt nog geen boekingen.</p>
                            <Link className="button button-primary" to="/reizen">
                                Bekijk reizen
                            </Link>
                        </div>
                    ) : null}

                    {!loading && !error && sortedBookings.length > 0 ? (
                        <div className="profile-bookings">
                            {sortedBookings.map((b) => (
                                <div className="profile-booking" key={b.id}>
                                    <div>
                                        <p className="profile-booking-title">{b.travelTitle}</p>
                                        <p className="profile-booking-meta">
                                            {formatDateNL(b.startDate)} • {b.guests} gasten
                                        </p>
                                    </div>

                                    <div className="profile-booking-right">
                                        <p className="profile-booking-price">
                                            {formatPriceEUR(b.total)}
                                        </p>
                                        <p className="profile-booking-id">{b.id}</p>

                                        <button
                                            className="profile-booking-delete"
                                            type="button"
                                            onClick={() => handleDeleteBooking(b.id)}
                                        >
                                            Verwijderen
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            </section>
        </div>
    );
}
