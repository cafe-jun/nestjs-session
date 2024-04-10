import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DEFAULT_REDIS_NAMESPACE, RedisModule } from '@liaoliaots/nestjs-redis';
import { PrismaModule } from 'nestjs-prisma';
import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {},
      },
    }),
    RedisModule.forRoot({
      readyLog: true,
      errorLog: true,
      config: [
        {
          namespace: DEFAULT_REDIS_NAMESPACE,
          host: 'localhost',
          port: 6379,
        },
        {
          namespace: 'subscribe',
          host: 'localhost',
          port: 6379,
        },
      ],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class WorkerModule {}
