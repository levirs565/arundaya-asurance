import { AppBar, AppBarTitle } from "@client/components/app-bar";
import { useParams } from "react-router-dom";
import { ClaimReviewForm } from "./ClaimReviewForm";

export function ClaimAddReview() {
    const { id } = useParams();

    return <div>
        <AppBar>
            <AppBarTitle>
                Tulis Review Klaim
            </AppBarTitle>
        </AppBar>

        <div className="p-4">
            <ClaimReviewForm id={parseInt(String(id))} />
        </div>
    </div>
}