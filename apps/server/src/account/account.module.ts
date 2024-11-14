import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AccountManagerService } from "./account-manager.service";

@Module({
    imports: [PrismaModule],
    controllers: [AccountController],
    providers: [AccountService, AccountManagerService],
    exports: [AccountManagerService]
})
export class AccountModule {

}