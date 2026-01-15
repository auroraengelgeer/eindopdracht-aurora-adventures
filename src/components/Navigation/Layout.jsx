import { Outlet } from "react-router-dom";
import Navigation from "./Navigation.jsx";

export default function Layout() {
    return (
        <>
            <Navigation />
            <main className="page-container">
                <Outlet />
            </main>
        </>
    );
}
