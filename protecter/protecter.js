import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children, ...props }) {
    const location = useLocation();
    const token = window.localStorage.getItem("token");
    if (token) return children;
    return <Navigate to="/" state={{ from: location }} replace />;
}