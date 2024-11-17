import { Module } from "@nestjs/common";
import { UserClassService } from "./user-class.service";
import { UserClassController } from "./user-class.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    providers: [UserClassService],
    controllers: [UserClassController],
    imports: [PrismaModule]
})
export class UserClassModule {

}