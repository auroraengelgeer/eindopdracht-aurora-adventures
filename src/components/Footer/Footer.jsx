import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-col">
                    <p className="footer-brand">Aurora Adventures</p>
                    <p className="footer-text">
                        Betaalbare reizen naar de Malediven — vakantiepakketten en activiteiten.
                    </p>
                </div>

                <div className="footer-col">
                    <p className="footer-title">Pagina’s</p>
                    <ul className="footer-links">
                        <li><Link to="/reizen">Reizen</Link></li>
                        <li><Link to="/profiel">Profiel</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/over-ons">Over ons</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <p className="footer-title">Contact</p>
                    <ul className="footer-links">
                        <li><a href="mailto:info@auroraadventures.nl">info@auroraadventures.nl</a></li>
                        <li><span className="footer-muted">KvK: 96709812</span></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {year} Aurora Adventures</p>
                <p className="footer-muted">Demo project (NOVI)</p>
            </div>
        </footer>
    );
}
