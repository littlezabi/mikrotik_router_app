import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import reactDom from "react-dom/client";
import Admin from "./pages/admin/admin";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/authProvider";
import SignIn from "./pages/admin/login";

const Layout = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                </Routes>
                <Routes>
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <Admin />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/admin/login" element={<SignIn />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

if (document.getElementById("react-app")) {
    const Index = reactDom.createRoot(document.getElementById("react-app"));
    Index.render(<Layout />);
}
