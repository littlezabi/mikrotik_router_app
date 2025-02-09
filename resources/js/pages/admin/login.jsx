import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import axios from "axios";

const providers = [{ id: "credentials", name: "Email and Password" }];

const SignIn = () => {
    const handleLogin = async (provider, formData) => {
        try {
            const response = await axios.post("/api/login", formData, {
                withCredentials: true,
            });
            localStorage.setItem("token", response.data.token);
            return { success: true };
        } catch (error) {
            console.log(error);
            console.error(
                "Login failed:",
                error.response?.data?.message || error.message,
            );
            return {
                error: error.response?.data?.message || "Login failed!",
            };
        }
    };
    return (
        <AppProvider>
            <SignInPage
                signIn={handleLogin}
                slotProps={{
                    emailField: { variant: "standard", autoFocus: true },
                    passwordField: { variant: "standard" },
                    submitButton: { variant: "outlined" },
                    rememberMe: {
                        control: (
                            <Checkbox
                                name="tandc"
                                value="true"
                                color="primary"
                                sx={{
                                    padding: 0.5,
                                    "& .MuiSvgIcon-root": { fontSize: 20 },
                                }}
                            />
                        ),
                        color: "textSecondary",
                        label: "Remember me",
                    },
                }}
                providers={providers}
            />
            ;
        </AppProvider>
    );
};
export default SignIn;
