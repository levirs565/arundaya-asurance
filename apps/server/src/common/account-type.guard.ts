import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AccountType } from "@prisma/client";
import { Observable } from "rxjs";
import { Request } from "express";
import { CommonServiceException } from "./common-service.exception";

type AllowedAccountTypeUnion = "LOGGED" | "NOTLOGGED" | AccountType;

export const AllowedAccountType = Reflector.createDecorator<AllowedAccountTypeUnion>();

@Injectable()
export class AccountTypeGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    private getContextAllowed(context: ExecutionContext): AllowedAccountTypeUnion {
        const handlerAllowed = this.reflector.get(AllowedAccountType, context.getHandler());

        if (handlerAllowed) {
            return handlerAllowed;
        }

        return this.reflector.get(AllowedAccountType, context.getClass())
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const allowed = this.getContextAllowed(context);

        if (!allowed) {
            return true;
        }

        const request: Request = context.switchToHttp().getRequest();
        const session = request.session;

        if (allowed == "NOTLOGGED") {
            if (session.account) {
                throw new CommonServiceException("You are logged in");
            }

            return true;
        }

        if (!session.account) {
            throw new CommonServiceException("Account not logged in");
        }

        if (allowed == "LOGGED") {
            return true;
        }

        if (session.account.type != allowed) {
            throw new CommonServiceException("Forbidden access");
        }

        return true;
    }

}