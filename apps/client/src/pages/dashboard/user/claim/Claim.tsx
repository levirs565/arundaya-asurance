import { Button } from "@client/components/ui/button";
import { ClaimAddDialog } from "./ClaimDialog";
import { ClaimList } from "./ClaimList";
import { AppBar, AppBarTitle } from "@client/components/app-bar";
import { SidebarTrigger } from "@client/components/ui/sidebar";

export function ClaimPage() {
    return <div>
        <AppBar>
            <SidebarTrigger/>
            <AppBarTitle>Claim</AppBarTitle>
            <ClaimAddDialog >
                <Button>Ajukan Klaim</Button>
            </ClaimAddDialog>
        </AppBar>
        <div className="p-4">
            <ClaimList/>
        </div>
    </div>
}