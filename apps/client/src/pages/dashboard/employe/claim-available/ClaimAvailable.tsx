import { AppBar, AppBarTitle } from "@client/components/app-bar";
import { ClaimAvailableList } from "./ClaimAvailableList";

export function ClaimAvailable() {
    return <div>
        <AppBar>
            <AppBarTitle>Ambil Klaim</AppBarTitle>
        </AppBar>

        <div className="p-4">
            <ClaimAvailableList/>
        </div>
    </div>
}