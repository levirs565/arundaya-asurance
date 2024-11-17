import { Controller, Get } from "@nestjs/common";
import { UserClassService } from "./user-class.service";
import { ClassData } from "@prisma/client";

@Controller()
export class UserClassController {
    constructor(private userClassService: UserClassService) {}

    @Get("/")
    async list(): Promise<ClassData[]> {
        return this.userClassService.list();
    }
}