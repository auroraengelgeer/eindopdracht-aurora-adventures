import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import Footer from "./components/Footer/Footer.jsx";

export default function Layout() {
    const location = useLocation();

    const isAuthPage =
        location.pathname === "/inloggen" ||
        location.pathname === "/registreren";

    return (
        <div className="app-shell">
            <Navigation variant={isAuthPage ? "auth" : "default"} />

            {isAuthPage ? (
                <main className="app-main">
                    <Outlet />
                </main>
            ) : (
                <main className="app-main page-container">
                    <Outlet />
                </main>
            )}

            {/* Footer niet tonen op auth pagina's */}
            {!isAuthPage && <Footer />}
        </div>
    );
}
