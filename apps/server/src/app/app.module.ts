import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma.service';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private prismaClient: PrismaService, private configService: ConfigService) {}
  
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(
        session({
          store: new PrismaSessionStore(this.prismaClient, {
            checkPeriod: 2 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
          }),
          secret: this.configService.getOrThrow<string>("SESSION_SECRET")
        })
      )
  }
}
