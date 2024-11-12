import { Button } from "@client/components/ui/button";
import { ClaimAddDialog } from "./ClaimAddDialog";
import { ClaimList } from "./ClaimList";
import { AppBar, AppBarTitle } from "@client/components/app-bar";

export function ClaimPage() {
    return <div>
        <AppBar>
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