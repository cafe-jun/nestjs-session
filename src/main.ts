import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './common/adapter/redis.adapter';
import { Logger } from '@nestjs/common';
import { createServer } from 'http';
import { setupMaster } from '@socket.io/sticky';
import cluster from 'node:cluster';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  if (cluster.isPrimary) {
    const httpServer = createServer();

    for (let index = 0; index < 2; index++) {
      const worker = cluster.fork();
      worker.on('exit', () => {
        logger.error(`worker die ${process.pid}`);
      });
      worker.on('error', () => {
        logger.error(`worker error ${process.pid}`);
      });
    }

    setupMaster(httpServer, {
      loadBalancingMethod: 'round-robin',
    });
    logger.log(`Node Master Server : ${process.pid}`);
  } else {
    const app = await NestFactory.create(AppModule);
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);
    await app.listen(3000);
  }
}
bootstrap();
