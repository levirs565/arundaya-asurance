import { AppBar, AppBarTitle } from "@client/components/app-bar";
import { ClaimAvailableList } from "./ClaimAvailableList";
import { SidebarTrigger } from "@client/components/ui/sidebar";

export function ClaimAvailable() {
    return <div>
        <AppBar>
            <SidebarTrigger/>
            <AppBarTitle>Ambil Klaim</AppBarTitle>
        </AppBar>

        <div className="p-4">
            <ClaimAvailableList/>
        </div>
    </div>
}