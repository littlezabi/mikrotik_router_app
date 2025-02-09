import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    console.log("admin: ", user);

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
