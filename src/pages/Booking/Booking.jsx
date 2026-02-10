import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTravel } from "../../hooks/useTravel";
import { createBooking } from "../../api/bookings";
import { isJwtToken } from "../../helpers/isJwtToken";
import PageState from "../../components/PageState/PageState";
import GuestSelector from "../../components/GuestSelector/GuestSelector";
import { formatDurationDays } from "../../helpers/format";
import BookingSteps from "../../components/BookingSteps/BookingSteps";
import FormField from "../../components/FormField/FormField";
import BookingSummaryCard from "../../components/BookingSummaryCard/BookingSummaryCard";
import "./Booking.css";



export default function Booking() {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
    });

    const [startDate, setStartDate] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [termsAccepted, setTermsAccepted] = useState(false);

    const { travelId } = useParams();
    const { user, token } = useAuth();

    const location = useLocation();
    const initialGuests = Number(location.state?.guests) || 2;

    const [guests, setGuests] = useState(initialGuests);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    function validateStep1() {
        if (!formData.firstName.trim()) return "Voornaam is verplicht.";
        if (!formData.lastName.trim()) return "Achternaam is verplicht.";
        if (!formData.email.trim()) return "Email is verplicht.";
        if (!formData.phone.trim()) {
            return "Vul een telefoonnummer in zodat we je kunnen bereiken.";
        }

        const address = formData.address.trim();
        if (!address) return "Vul je adres in.";
        if (!/\d/.test(address)) {
            return "Voeg ook een huisnummer toe aan je adres.";
        }

        if (!formData.city.trim()) return "Stad is verplicht.";
        if (!formData.postalCode.trim()) return "Postcode is verplicht.";
        return "";
    }

    function validateStep2() {
        if (!startDate) return "Startdatum is verplicht.";
        if (guests < 1) return "Aantal gasten moet minimaal 1 zijn.";
        return "";
    }



    useEffect(() => {
        if (!user) return;

        setFormData((prev) => {
            const next = {
                ...prev,
                email: user.email || prev.email,
                firstName: user.firstName || prev.firstName,
                lastName: user.lastName || prev.lastName,
            };

            const changed =
                next.email !== prev.email ||
                next.firstName !== prev.firstName ||
                next.lastName !== prev.lastName;

            return changed ? next : prev;
        });
    }, [user?.email, user?.firstName, user?.lastName]);



    const { travel, loading, error } = useTravel(travelId);


    if (loading) {
        return <PageState className="booking" title="Boeking afronden" message="Reis laden..." />;
    }


    if (error) {
        return (
            <PageState
                className="booking"
                title="Boeking afronden"
                message={error}
                actionTo="/reizen"
                actionLabel="Terug naar reizen"
            />
        );
    }


    if (!travel) {
        return (
            <PageState
                className="booking"
                title="Boeking afronden"
                message="Reis niet gevonden."
                actionTo="/reizen"
                actionLabel="Terug naar reizen"
            />
        );
    }



    function nextStep() {
        setSubmitError("");
        setStep((prev) => Math.min(prev + 1, 3));
    }

    function prevStep() {
        setSubmitError("");
        setStep((prev) => Math.max(prev - 1, 1));
    }

    const pricePerPerson = travel?.pricePerPerson || 0;
    const serviceFee = 25;

    const subtotal = pricePerPerson * guests;
    const total = subtotal + serviceFee;


    function generateBookingId() {
        return Date.now(); // number
    }


    function getSummarySubtitle(travel) {
        if (!travel) return "";

        if (travel.category === "tour") {
            return `${formatDurationDays(travel.durationDays)} activiteit`;
        }

        if (travel.category === "package") {
            return "Vakantiepakket inclusief verblijf";
        }

        return travel.shortDescription || "";
    }


    return (
        <div className="booking">
            <header className="booking-hero">
                <h1>Boeking afronden</h1>
                <p className="booking-hero-sub">{travel?.title}</p>
            </header>

            <BookingSteps step={step} />


            <p className="booking-step-label">
                {step === 1 && "Contactgegevens"}
                {step === 2 && "Reisdetails"}
                {step === 3 && "Betaling"}
            </p>

            {isConfirmed && (
                <div className="booking-success">
                    <h2>Boeking bevestigd!</h2>
                    <p>Je ontvangt binnen enkele minuten een bevestiging per e-mail.</p>

                    <div className="success-actions">
                        <Link to="/reizen" className="button button-primary">
                            Bekijk meer reizen
                        </Link>

                        <Link to="/" className="button button-secondary">
                            Terug naar home
                        </Link>
                    </div>
                </div>
            )}


            {!isConfirmed && (
                <section className="booking-layout">

                <div className="booking-form-card">
                    {step === 1 && (
                        <>
                            <h2>Contactgegevens</h2>

                            <div className="grid-2">
                                <FormField label="Voornaam" required>
                                    <input
                                        type="text"
                                        placeholder="Jan"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    />
                                </FormField>

                                <FormField label="Achternaam" required>
                                    <input
                                        type="text"
                                        placeholder="de Vries"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    />
                                </FormField>

                            </div>

                            <div className="grid-2">

                                <FormField label="Email" required>
                                    <input
                                        type="email"
                                        placeholder="jan@voorbeeld.nl"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </FormField>

                                <FormField label="Telefoon" required>
                                    <input
                                        type="tel"
                                        placeholder="+31 6 12345678"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </FormField>

                            </div>

                            <FormField label="Adres" required>
                                <input
                                    type="text"
                                    placeholder="Straatnaam 123"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </FormField>


                            <div className="grid-2">

                                <FormField label="Stad" required>
                                    <input
                                        type="text"
                                        placeholder="Amsterdam"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    />
                                </FormField>

                                <FormField label="Postcode" required>
                                    <input
                                        type="text"
                                        placeholder="1234 AB"
                                        value={formData.postalCode}
                                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                    />
                                </FormField>

                            </div>

                            {submitError && (
                                <div className="booking-error">
                                    {submitError}
                                </div>
                            )}

                            <div className="actions">
                                <button
                                    className="button button-primary"
                                    type="button"
                                    onClick={() => {
                                        const msg = validateStep1();
                                        if (msg) {
                                            setSubmitError(msg);
                                            return;
                                        }
                                        setSubmitError("");
                                        nextStep();
                                    }}
                                >
                                    Volgende
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2>Reisdetails</h2>

                            <FormField label="Startdatum" required>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </FormField>


                            <GuestSelector value={guests} onChange={setGuests} min={1} />


                            <div className="info-box">
                                <p><strong>Belangrijke informatie</strong></p>
                                <ul>
                                <li>Gratis annulering tot 48 uur voor vertrek</li>
                                    <li>Bevestiging binnen 24 uur na boeking</li>
                                    <li>Reisbevestiging wordt per e-mail verzonden</li>
                                </ul>
                            </div>

                            {submitError && (
                                <div className="booking-error">
                                    {submitError}
                                </div>
                            )}

                            <div className="actions actions-between">
                                <button className="button button-secondary" type="button" onClick={prevStep}>
                                    Vorige
                                </button>
                                <button
                                    className="button button-primary"
                                    type="button"
                                    onClick={() => {
                                        const msg = validateStep2();
                                        if (msg) {
                                            setSubmitError(msg);
                                            return;
                                        }
                                        setSubmitError("");
                                        nextStep();
                                    }}
                                >
                                    Volgende
                                </button>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h2>Betaalgegevens</h2>

                            <div className="field">
                                <label>Naam op kaart *</label>
                                <input type="text" placeholder="Jan de Vries"/>
                            </div>

                            <div className="field">
                                <label>Kaartnummer *</label>
                                <input type="text" placeholder="1234 5678 9012 3456"/>
                            </div>

                            <div className="grid-2">
                                <div className="field">
                                    <label>Vervaldatum *</label>
                                    <input type="text" placeholder="MM/YY"/>
                                </div>
                                <div className="field">
                                    <label>CVV *</label>
                                    <input type="text" placeholder="123"/>
                                </div>
                            </div>

                            <div className="checkbox-row">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                />
                                <label htmlFor="terms">
                                    Ik ga akkoord met de <span className="linkish">algemene voorwaarden</span> en
                                    het{" "}
                                    <span className="linkish">privacybeleid</span>
                                </label>
                            </div>

                            {submitError && (
                                <div className="booking-error">
                                    {submitError}
                                </div>
                            )}


                            <div className="actions actions-between">
                                <button className="button button-secondary" type="button" onClick={prevStep}>
                                    Vorige
                                </button>
                                <button
                                    className="button button-primary"
                                    type="button"
                                    disabled={!termsAccepted || isSubmitting}
                                    onClick={async () => {
                                        setSubmitError("");
                                        setIsSubmitting(true);

                                        try {
                                            const bookingPayload = {
                                                id: generateBookingId(),
                                                createdAt: new Date().toISOString(),

                                                travelId: Number(travelId),
                                                travelTitle: travel?.title || "Onbekende reis",

                                                guests,
                                                startDate,

                                                firstName: formData.firstName,
                                                lastName: formData.lastName,
                                                email: formData.email,
                                                phone: formData.phone,
                                                address: formData.address,
                                                city: formData.city,
                                                postalCode: formData.postalCode,

                                                subtotal,
                                                serviceFee,
                                                total,

                                                userEmail: user?.email || formData.email,
                                            };

                                            const jwt = isJwtToken(token) ? token : "";
                                            await createBooking(bookingPayload, jwt);

                                            setIsConfirmed(true);
                                        } catch (e) {
                                            console.error("Booking POST failed:", e);
                                            setSubmitError("Boeking opslaan lukt nu niet. Probeer opnieuw.");
                                        } finally {
                                            setIsSubmitting(false);
                                        }
                                    }}
                                >
                                    {isSubmitting ? "Bezig met opslaan..." : "Boeking bevestigen"}
                                </button>
                        </div>
                        </>
                        )}
                </div>

                    <BookingSummaryCard
                        travel={travel}
                        subtitle={getSummarySubtitle(travel)}
                        guests={guests}
                        pricePerPerson={pricePerPerson}
                        subtotal={subtotal}
                        serviceFee={serviceFee}
                        total={total}
                    />

                </section>
            )}
        </div>
    );
}
