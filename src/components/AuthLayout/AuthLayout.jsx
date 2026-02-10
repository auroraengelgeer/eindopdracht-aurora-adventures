export default function AuthLayout({
                                       leftClassName = "auth-left",
                                       leftTitle,
                                       leftText,
                                       rightInnerClassName = "auth-card",
                                       children,
                                   }) {
    return (
        <div className="auth-page">
            <section className={leftClassName}>
                <div className="auth-left-overlay">
                    {leftTitle ? <h1 className="auth-left-title">{leftTitle}</h1> : null}
                    {leftText ? <p className="auth-left-text">{leftText}</p> : null}
                </div>
            </section>

            <section className="auth-right">
                <div className={rightInnerClassName}>
                    {children}
                </div>
            </section>
        </div>
    );
}
