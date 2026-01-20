import { useState } from "react";
import "./Booking.css";
import { useParams } from "react-router-dom";
import { dummyTravels } from "../../helpers/dummyTravels";


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
    const [guests, setGuests] = useState(2);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [termsAccepted, setTermsAccepted] = useState(false);

    const { travelId } = useParams();

    const travel = dummyTravels.find((t) => String(t.id) === String(travelId));
    if (!travel) {
        return (
            <div className="booking">
                <h1>Boeking afronden</h1>
                <p>Reis niet gevonden.</p>
            </div>
        );
    }




    function nextStep() {
        setStep((prev) => Math.min(prev + 1, 3));
    }

    function prevStep() {
        setStep((prev) => Math.max(prev - 1, 1));
    }

    const pricePerPerson = travel?.pricePerPerson || 0;
    const serviceFee = 25;

    const subtotal = pricePerPerson * guests;
    const total = subtotal + serviceFee;

    const formatPrice = (amount) =>
        new Intl.NumberFormat("nl-NL").format(amount);




    return (
        <div className="booking">
            <header className="booking-hero">
                <h1>Boeking afronden</h1>
                <p className="booking-hero-sub">{travel?.title}</p>
            </header>

            <div className="booking-steps">
            <div className={`step ${step === 1 ? "step-active" : ""} ${step > 1 ? "step-done" : ""}`}>1</div>
                <div className={`step-line ${step > 1 ? "step-line-active" : ""}`}/>

                <div className={`step ${step === 2 ? "step-active" : ""} ${step > 2 ? "step-done" : ""}`}>2</div>
                <div className={`step-line ${step > 2 ? "step-line-active" : ""}`}/>

                <div className={`step ${step === 3 ? "step-active" : ""}`}>3</div>
            </div>


            <p className="booking-step-label">
                {step === 1 && "Contactgegevens"}
                {step === 2 && "Reisdetails"}
                {step === 3 && "Betaling"}
            </p>

            {isConfirmed && (
                <div className="booking-success">
                    <h2>Boeking bevestigd 🎉</h2>
                    <p>Je ontvangt binnen enkele minuten een bevestiging per e-mail.</p>
                </div>
            )}


            {!isConfirmed && (
                <section className="booking-layout">

                <div className="booking-form-card">
                    {step === 1 && (
                        <>
                            <h2>Contactgegevens</h2>

                            <div className="grid-2">
                                <div className="field">
                                    <label>Voornaam *</label>
                                    <input
                                        type="text"
                                        placeholder="Jan"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                    />

                                </div>
                                <div className="field">
                                    <label>Achternaam *</label>
                                    <input
                                        type="text"
                                        placeholder="de Vries"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                    />

                                </div>
                            </div>

                            <div className="grid-2">
                                <div className="field">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        placeholder="jan@voorbeeld.nl"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({...formData, email: e.target.value})
                                        }
                                    />

                                </div>
                                <div className="field">
                                    <label>Telefoon</label>
                                    <input
                                        type="tel"
                                        placeholder="+31 6 12345678"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({...formData, phone: e.target.value})
                                        }
                                    />

                                </div>
                            </div>

                            <div className="field">
                                <label>Adres *</label>
                                <input
                                    type="text"
                                    placeholder="Straatnaam 123"
                                    value={formData.address}
                                    onChange={(e) =>
                                        setFormData({...formData, address: e.target.value})
                                    }
                                />

                            </div>

                            <div className="grid-2">
                                <div className="field">
                                    <label>Stad *</label>
                                    <input
                                        type="text"
                                        placeholder="Amsterdam"
                                        value={formData.city}
                                        onChange={(e) =>
                                            setFormData({...formData, city: e.target.value})
                                        }
                                    />

                                </div>
                                <div className="field">
                                    <label>Postcode *</label>
                                    <input
                                        type="text"
                                        placeholder="1234 AB"
                                        value={formData.postalCode}
                                        onChange={(e) =>
                                            setFormData({...formData, postalCode: e.target.value})
                                        }
                                    />

                                </div>
                            </div>

                            <div className="actions">
                                <button className="button button-primary" type="button" onClick={nextStep}>
                                    Volgende
                                </button>

                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2>Reisdetails</h2>

                            <div className="field">
                                <label>Startdatum *</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />

                            </div>

                            <div className="field">
                                <label>Aantal gasten</label>
                                <div className="guest-row">
                                    <button type="button" className="guest-btn"
                                            onClick={() => setGuests(g => Math.max(1, g - 1))}>-
                                    </button>
                                    <span>{guests}</span>
                                    <button type="button" className="guest-btn"
                                            onClick={() => setGuests(g => g + 1)}>+
                                    </button>

                                </div>
                            </div>

                            <div className="info-box">
                                <p><strong>Belangrijke informatie</strong></p>
                                <ul>
                                <li>Gratis annulering tot 48 uur voor vertrek</li>
                                    <li>Bevestiging binnen 24 uur na boeking</li>
                                    <li>Reisbevestiging wordt per e-mail verzonden</li>
                                </ul>
                            </div>

                            <div className="actions actions-between">
                                <button className="button button-secondary" type="button" onClick={prevStep}>
                                    Vorige
                                </button>
                                <button className="button button-primary" type="button" onClick={nextStep}>
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

                            <div className="actions actions-between">
                                <button className="button button-secondary" type="button" onClick={prevStep}>
                                    Vorige
                                </button>
                                <button
                                    className="button button-primary"
                                    type="button"
                                    disabled={!termsAccepted}
                                    onClick={() => {
                                        const bookingPayload = {
                                            travelId,
                                            guests,
                                            startDate,
                                            contact: formData,
                                            subtotal,
                                            serviceFee,
                                            total,
                                        };

                                        console.log("Booking payload:", bookingPayload);
                                        setIsConfirmed(true);
                                    }}
                                >

                                    Boeking bevestigen
                                </button>

                            </div>
                        </>
                    )}
                </div>

                    <aside className="booking-summary-card">
                        <div className="summary-image" aria-label="Reis afbeelding"/>
                        <h3>{travel?.title}</h3>
                        <p className="summary-sub">All-inclusive paradise with activities</p>

                        <div className="summary-row">
                            <span>€{pricePerPerson} × {guests} gasten</span>
                            <span>€{formatPrice(subtotal)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Servicekosten</span>
                            <span>€{formatPrice(serviceFee)}</span>
                        </div>

                        <div className="summary-total">
                            <span>Totaal</span>
                            <span>€{formatPrice(total)}</span>
                        </div>

                        <div className="summary-safe">
                            <span>✓</span>
                            <p>
                                <strong>Veilig betalen</strong><br/>
                                Je gegevens zijn beschermd
                            </p>
                        </div>
                    </aside>
                </section>
            )}
        </div>
    );
}
