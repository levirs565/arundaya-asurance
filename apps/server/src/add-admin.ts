import { NestFactory } from "@nestjs/core";
import { parseArgs } from "node:util";
import { AppModule } from "./app/app.module";
import { AccountModule } from "./account/account.module";
import { AccountService } from "./account/account.service";
import "./types/session";

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

    const accountService = app.select(AccountModule).get(AccountService);

    await accountService.addAdmin(id, name, password);

    await app.close();
}

bootstrap();