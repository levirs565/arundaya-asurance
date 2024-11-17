import { AppBar, AppBarTitle } from "@client/components/app-bar";
import { useParams } from "react-router-dom";
import { ClaimReviewForm } from "./ClaimReviewForm";
import { SidebarTrigger } from "@client/components/ui/sidebar";

export function ClaimAddReview() {
    const { id } = useParams();

    return <div>
        <AppBar>
            <SidebarTrigger />
            <AppBarTitle>
                Tulis Review Klaim
            </AppBarTitle>
        </AppBar>

        <div className="p-4">
            <ClaimReviewForm id={parseInt(String(id))} />
        </div>
    </div>
}