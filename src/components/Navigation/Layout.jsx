import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation.jsx";

export default function Layout() {
    const location = useLocation();

    const isAuthPage =
        location.pathname === "/inloggen" ||
        location.pathname === "/registreren";

    return (
        <>
            <Navigation variant={isAuthPage ? "auth" : "default"} />

            {isAuthPage ? (
                <Outlet />
            ) : (
                <main className="page-container">
                    <Outlet />
                </main>
            )}
        </>
    );
}
