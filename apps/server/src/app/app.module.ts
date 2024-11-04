import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { AccountModule } from '../account/account.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ClaimModule } from '../claim/claim.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AccountModule,
    ClaimModule,
    RouterModule.register([
      {
        path: "account",
        module: AccountModule
      },
      {
        path: "claim",
        module: ClaimModule
      }
    ])
  ],

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
