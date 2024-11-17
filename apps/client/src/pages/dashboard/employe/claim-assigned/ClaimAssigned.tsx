import { AppBar, AppBarTitle } from "@client/components/app-bar";
import { ClaimAssignedList } from "./ClaimAssignedList";
import { SidebarTrigger } from "@client/components/ui/sidebar";

export function ClaimAssigned() {
    return <div>
        <AppBar>
            <SidebarTrigger/>
            <AppBarTitle>
                Review Klaim
            </AppBarTitle>
        </AppBar>

        <div className="p-4">
            <ClaimAssignedList/>
        </div>
    </div>
}