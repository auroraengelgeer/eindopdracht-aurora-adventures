import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useMemo, useState } from "react";
import "./Profile.css";

export default function Profile() {

    const { user } = useAuth();

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("bookings") || "[]");
        setBookings(stored);
    }, []);

    const myBookings = useMemo(() => {
        if (!user?.email) return [];
        return bookings.filter((b) => b.userEmail === user.email);
    }, [bookings, user?.email]);

    return (
        <div className="profile">
            <header className="profile-hero">
                <h1>Mijn profiel</h1>
                <p>Beheer je gegevens en bekijk je (toekomstige) boekingen.</p>
            </header>

            <section className="profile-grid">
                <div className="profile-card">
                    <h2>Gegevens</h2>

                    <div className="profile-row">
                        <span>Naam</span>
                        <span>
              {user?.firstName} {user?.lastName}
            </span>
                    </div>

                    <div className="profile-row">
                        <span>E-mail</span>
                        <span>{user?.email}</span>
                    </div>

                    <div className="profile-actions">
                        <button className="button button-secondary" type="button" disabled>
                            Gegevens wijzigen (later)
                        </button>
                    </div>
                </div>

                <div className="profile-card">
                    <h2>Mijn boekingen</h2>

                    {myBookings.length === 0 ? (
                        <div className="profile-empty">
                            <p>Je hebt nog geen boekingen.</p>
                            <Link className="button button-primary" to="/reizen">
                                Bekijk reizen
                            </Link>
                        </div>
                    ) : (
                        <div className="profile-bookings">
                            {myBookings
                                .slice()
                                .reverse()
                                .map((b) => (
                                    <div className="profile-booking" key={b.id}>
                                        <div>
                                            <p className="profile-booking-title">{b.travelTitle}</p>
                                            <p className="profile-booking-meta">
                                                {b.startDate || "Geen datum"} • {b.guests} gasten
                                            </p>
                                        </div>

                                        <div className="profile-booking-right">
                                            <p className="profile-booking-price">€{b.total}</p>
                                            <p className="profile-booking-id">{b.id}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
