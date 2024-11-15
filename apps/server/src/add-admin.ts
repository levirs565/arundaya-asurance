import { NestFactory } from "@nestjs/core";
import { parseArgs } from "node:util";
import { AppModule } from "./app/app.module";
import { AccountModule } from "./account/account.module";
import { AccountService } from "./account/account.service";
import "./types/session";
import { AccountManagerService } from "./account/account-manager.service";
import { AccountType } from "@prisma/client";

const { values: {id, name, password} } = parseArgs({
    options: {
        id: {
            type: "string"
        },
        name: {
            type: "string"
        },
        password: {
            type: "string"
        }
    }
});

if (!name || !id || !password) {
    
    console.log("Please fill id, name, password");
    process.exit();
}

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const accountService = app.select(AccountModule).get(AccountManagerService);

    await accountService.addAccount({
        id,
        name,
        password,
        type: AccountType.ADMIN
    });

    await app.close();
}

bootstrap();