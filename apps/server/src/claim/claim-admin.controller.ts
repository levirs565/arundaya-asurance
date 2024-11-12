import { Controller } from "@nestjs/common";
import { ClaimService } from "./claim.service";

@Controller()
export class ClaimAdminController {
    constructor(private claimService: ClaimService) {}

    
}