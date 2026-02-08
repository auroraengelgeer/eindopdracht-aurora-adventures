import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useMemo, useState } from "react";
import { getBookings } from "../../api/bookings";
import { isJwtToken } from "../../helpers/isJwtToken";
import "./Profile.css";

export default function Profile() {

    const formatPrice = (amount) =>
        new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(
            Number(amount || 0)
        );

    const formatDate = (iso) => {
        if (!iso) return "Geen datum";
        // iso kan "YYYY-MM-DD" zijn of volledige ISO string
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return "Geen datum";
        return new Intl.DateTimeFormat("nl-NL", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(d);
    };


    const { user, token } = useAuth();

    const [bookings, setBookings] = useState([]);


    useEffect(() => {
        async function fetchBookings() {
            try {
                const jwt = isJwtToken(token) ? token : "";
                const data = await getBookings(jwt);
                setBookings(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error("Bookings ophalen mislukt:", e);
                setBookings([]);
            }
        }

        fetchBookings();
    }, [token]);



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
                                .sort((a, b) => {
                                    const da = new Date(a.createdAt || 0).getTime();
                                    const db = new Date(b.createdAt || 0).getTime();
                                    return db - da; // nieuwste bovenaan
                                })
                                .map((b) => (

                                    <div className="profile-booking" key={b.id}>
                                        <div>
                                            <p className="profile-booking-title">{b.travelTitle}</p>
                                            <p className="profile-booking-meta">
                                                {formatDate(b.startDate)} • {b.guests} gasten
                                            </p>
                                        </div>

                                        <div className="profile-booking-right">
                                            <p className="profile-booking-price">{formatPrice(b.total)}</p>
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
