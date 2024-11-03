import Session from "../types/session";
import { CommonServiceException } from "./common-service.exception";

export function validateAccountLoggedIn(session: Session) {
    if (!session.account) {
        throw new CommonServiceException("Account not logged in");
    }
}