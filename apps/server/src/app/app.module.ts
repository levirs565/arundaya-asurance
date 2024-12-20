import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { AccountModule } from '../account/account.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ClaimUserModule } from '../claim-user/claim-user.module';
import { PremiModule } from '../premi/premi.module';
import { AccountTypeGuard } from '../common/account-type.guard';
import { ClaimModule } from '../claim/claim.module';
import { ClaimEmployeeModule } from '../claim-employee/claim-employee.module';
import { AdminEmployeeModule } from '../admin-employee/admin-employee.module';
import { ScheduleModule } from "@nestjs/schedule";
import { UserClassService } from '../user-class/user-class.service';
import { UserClassModule } from '../user-class/user-class.module';
import { UserClassController } from '../user-class/user-class.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    PrismaModule,
    AccountModule,
    ClaimModule,
    ClaimUserModule,
    ClaimEmployeeModule,
    PremiModule,
    AdminEmployeeModule,
    UserClassModule,
    RouterModule.register([
      {
        path: "admin/employee",
        module: AdminEmployeeModule
      },
      {
        path: "account",
        module: AccountModule
      },
      {
        path: "user/claim",
        module: ClaimUserModule,
      },
      {
        path: "employee/claim",
        module: ClaimEmployeeModule
      },
      {
        path: "premi",
        module: PremiModule
      },
      {
        path: "admin/employee",
        module: AdminEmployeeModule
      },
      {
        path: "user/class",
        module: UserClassModule
      }
    ])
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccountTypeGuard
    }
  ]
})
export class AppModule implements NestModule {
  constructor(private prismaClient: PrismaService, private configService: ConfigService) { }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      session({
        store: new PrismaSessionStore(this.prismaClient, {
          checkPeriod: 2 * 60 * 1000,  //ms
          dbRecordIdIsSessionId: true,
          dbRecordIdFunction: undefined,
        }),
        secret: this.configService.getOrThrow<string>("SESSION_SECRET"),
        resave: true
      })
    ).forRoutes("*");
  }
}
