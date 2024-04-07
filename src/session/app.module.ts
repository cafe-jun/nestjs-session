import { Module, Provider } from '@nestjs/common';
import { SessionService } from './service/session.service';
import { SessionRepositoryToken } from './service/repository/session.repository';
import { SessionRepositoryImpl } from './repository/session.repository.impl';
import { RedisEmitter } from '@app/common/adapter/redis.emitter';

export const SessionRepositoryProvider: Provider = {
  provide: SessionRepositoryToken,
  useClass: SessionRepositoryImpl,
};

@Module({
  providers: [SessionService, SessionRepositoryProvider, RedisEmitter],
  exports: [SessionRepositoryProvider],
})
export class SessionModule {}
