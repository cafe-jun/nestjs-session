import { Emitter } from '@socket.io/redis-emitter';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisEmitter implements OnModuleInit {
  private emitter: Emitter;

  async onModuleInit() {
    const redisClient = new Redis({ host: 'localhost', port: 6379 });
    this.emitter = new Emitter(redisClient);
    setInterval(() => {
      this.emitter.emit('time', new Date());
    }, 5000);
  }

  //   getEmitterHellow() {
  //     this.emitter.emit('time', new Date());
  //   }
}
