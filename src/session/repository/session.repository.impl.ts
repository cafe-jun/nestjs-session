import { Injectable, OnModuleInit } from '@nestjs/common';
import { SessionRepository } from '../service/repository/session.repository';
import { DEFAULT_REDIS_NAMESPACE, InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { v4 as uuidV4 } from 'uuid';

const SESSION_KEY = 'SESSION:';

@Injectable()
export class SessionRepositoryImpl implements SessionRepository, OnModuleInit {
  constructor(
    @InjectRedis(DEFAULT_REDIS_NAMESPACE) private redisClient: Redis,
    @InjectRedis('subscribe') private subscribe: Redis,
  ) {}
  async onModuleInit() {}
  async create(sessionDate: any): Promise<string> {
    const sessionId = uuidV4();
    const strSessionData = JSON.stringify(sessionDate);
    await this.redisClient.hset(SESSION_KEY, sessionId, strSessionData);
    return sessionId;
  }
  async update(sessionId: string, sessionDate: any): Promise<void> {
    await this.redisClient.hset(SESSION_KEY, sessionId, sessionDate);
  }
  async remove(sessionId: string): Promise<void> {
    await this.redisClient.hdel(SESSION_KEY, sessionId);
  }
}
