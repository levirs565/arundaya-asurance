import {
    createBrowserRouter,
} from "react-router-dom";
import { LoginPage } from "./pages/auth/Login";
import { RegisterPage } from "./pages/auth/Register";
import { DashboardPage } from "./pages/dashboard/Dashboard";
import { PremiPage } from "./pages/dashboard/user/premi/Premi";
import { ClaimPage } from "./pages/dashboard/user/claim/Claim";
import { AccountTypeGuard } from "./account-type.guard";
import { AdminEmployeePage } from "./pages/dashboard/admin/employee/Employee";
import { ClaimAvailable } from "./pages/dashboard/employe/claim-available/ClaimAvailable";
import { ClaimAssigned } from "./pages/dashboard/employe/claim-assigned/ClaimAssigned";
import { ClaimAddReview } from "./pages/dashboard/employe/claim-add-review/ClaimAddReview";

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
                path: "employee/claim-available",
                element: <AccountTypeGuard allowed="EMPLOYEE" redirectTo="/dashboard">
                    <ClaimAvailable/>
                </AccountTypeGuard>
            },
            {
                path: "employee/claim-assigned",
                element: <AccountTypeGuard allowed="EMPLOYEE" redirectTo="/dashboard">
                    <ClaimAssigned/>
                </AccountTypeGuard>
            },
            {
                path: "employee/claim-assigned/:id",
                element: <AccountTypeGuard allowed="EMPLOYEE" redirectTo="/dashboard">
                    <ClaimAddReview/>
                </AccountTypeGuard>
            },
            {
                path: "premi",
                element: <AccountTypeGuard allowed="USER" redirectTo="/dashboard">  
                    <PremiPage />
                </AccountTypeGuard>
            },
            {
                path: "admin/employee",
                element: <AccountTypeGuard allowed="ADMIN" redirectTo="/dashboard">
                    <AdminEmployeePage/>
                </AccountTypeGuard>
            }
        ]
    }
])