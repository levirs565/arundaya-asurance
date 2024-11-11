import { Button } from "@client/components/ui/button";
import { ClaimAddDialog } from "./ClaimAddDialog";
import { ClaimList } from "./ClaimList";

export function ClaimPage() {
    return <div>
        <div className="flex flex-row mb-4">
            <h1 className="text-2xl font-semibold mb-4 flex-grow">Claim</h1>
            <ClaimAddDialog >
                <Button>Ajukan Klaim</Button>
            </ClaimAddDialog>
        </div>
        <ClaimList/>
    </div>
}