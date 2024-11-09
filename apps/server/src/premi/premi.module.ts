import { Module } from "@nestjs/common";
import { PremiController } from "./premi.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { PremiService } from "./premi.service";

@Module({
    imports: [PrismaModule],
    controllers: [PremiController],
    providers: [PremiService]
})
export class PremiModule {}