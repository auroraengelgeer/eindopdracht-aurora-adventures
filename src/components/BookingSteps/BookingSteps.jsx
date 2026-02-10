export default function BookingSteps({ step }) {
    return (
        <div className="booking-steps">
            <div className={`step ${step === 1 ? "step-active" : ""} ${step > 1 ? "step-done" : ""}`}>1</div>
            <div className={`step-line ${step > 1 ? "step-line-active" : ""}`}/>

            <div className={`step ${step === 2 ? "step-active" : ""} ${step > 2 ? "step-done" : ""}`}>2</div>
            <div className={`step-line ${step > 2 ? "step-line-active" : ""}`}/>

            <div className={`step ${step === 3 ? "step-active" : ""}`}>3</div>
        </div>
    );
}
