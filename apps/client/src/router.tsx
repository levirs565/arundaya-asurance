import {
    createBrowserRouter,
} from "react-router-dom";
import { LoginPage } from "./pages/auth/Login";
import { RegisterPage } from "./pages/auth/Register";
import { DashboardPage } from "./pages/DashboardPage/Dashboard";
import { PremiPage } from "./pages/DashboardPage/Premi";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/dashboard",
        element: <DashboardPage />,
        children: [
            {
                path: "",
                element: <p>Kos</p>
            },
            {
                path: "premi",
                element: <PremiPage />
            }
        ]
    }
])