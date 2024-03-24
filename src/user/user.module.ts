import { Module, Provider } from '@nestjs/common';
import { UserRepositoryToken } from './service/repository/user.repository';
import { UserRepositoryImpl } from './repository/user.repository.impl';

export const UserRepositoryProvider: Provider = {
  provide: UserRepositoryToken,
  useClass: UserRepositoryImpl,
};

@Module({
  providers: [UserRepositoryProvider],
  exports: [UserRepositoryProvider],
})
export class UserModule {}
