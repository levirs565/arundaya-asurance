import { AppBar, AppBarTitle } from "@client/components/app-bar";
import { ClaimAssignedList } from "./ClaimAssignedList";

export function ClaimAssigned() {
    return <div>
        <AppBar>
            <AppBarTitle>
                Review Klaim
            </AppBarTitle>
        </AppBar>

        <div className="p-4">
            <ClaimAssignedList/>
        </div>
    </div>
}