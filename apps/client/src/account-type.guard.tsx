import { Navigate } from "react-router-dom";
import { useAccountState } from "./api/account";
import { AllowedAccountType } from "./types";

export function AccountTypeGuard({ allowed, redirectTo, children }: { allowed: AllowedAccountType, children: any, redirectTo: string }) {
    const { data, isLoading, error } = useAccountState();

    if (isLoading || error) {
        return <></>;
    }

    if (allowed == "NOTLOGGED") {
        if (data.account) {
            return <Navigate to={redirectTo}/>
        }

        return children;
    }

    if (!data.account) {
        return <Navigate to={redirectTo}/>
    }

    if (allowed == "LOGGED") {
        return children;
    }

    if (allowed != data.account.type) {
        return <Navigate to={redirectTo}/>
    }

    return children;
}