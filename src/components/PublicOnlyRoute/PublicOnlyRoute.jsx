import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function PublicOnlyRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (isAuthenticated) {
        const redirectTo = location.state?.from?.pathname || "/profiel";
        return <Navigate to={redirectTo} replace />;
    }

    return children;
}
