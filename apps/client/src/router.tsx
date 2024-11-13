import {
    createBrowserRouter,
} from "react-router-dom";
import { LoginPage } from "./pages/auth/Login";
import { RegisterPage } from "./pages/auth/Register";
import { DashboardPage } from "./pages/DashboardPage/Dashboard";
import { PremiPage } from "./pages/DashboardPage/Premi";
import { ClaimPage } from "./pages/DashboardPage/Claim";
import { AccountTypeGuard } from "./account-type.guard";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <AccountTypeGuard allowed="NOTLOGGED" redirectTo="/dashboard">
            <LoginPage />
        </AccountTypeGuard>,
    },
    {
        path: "/register",
        element: <AccountTypeGuard allowed="NOTLOGGED" redirectTo="/dashboard">
            <RegisterPage />
        </AccountTypeGuard>
    },
    {
        path: "/dashboard",
        element: <AccountTypeGuard allowed="LOGGED" redirectTo="/login">
            <DashboardPage />
        </AccountTypeGuard>,
        children: [
            {
                path: "user/claim",
                element: <AccountTypeGuard allowed="USER" redirectTo="/dashboard">
                    <ClaimPage />
                </AccountTypeGuard>
            },
            {
                path: "premi",
                element: <AccountTypeGuard allowed="USER" redirectTo="/dashboard">  
                    <PremiPage />
                </AccountTypeGuard>
            }
        ]
    }
])