import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { RedisIoAdapter } from './common/adapter/redis.adapter';
import { Logger } from '@nestjs/common';
import { createServer } from 'http';
import { setupMaster } from '@socket.io/sticky';
import cluster from 'node:cluster';
import { ProcessMessageCondition } from './common/emitter/process.emitter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MasterModule } from './master.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  if (cluster.isPrimary) {
    const app = NestFactory.create<NestExpressApplication>(MasterModule);
    const processEvent = (await app).get(ProcessMessageCondition);
    const httpServer = createServer();
    for (let index = 0; index < 2; index++) {
      const worker = cluster.fork();
      processEvent.setEvent(worker);
    }
    setupMaster(httpServer, {
      loadBalancingMethod: 'round-robin',
    });
    logger.log(`Node Master Server : ${process.pid}`);
  } else {
    const app = await NestFactory.create<NestExpressApplication>(WorkerModule);
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.setGlobalPrefix('/api');
    app.useWebSocketAdapter(redisIoAdapter);
    await app.listen(3000);
  }
}
bootstrap();
