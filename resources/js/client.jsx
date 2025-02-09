import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./layout";

const container = document.getElementById("react-app");
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<Layout />);
}
