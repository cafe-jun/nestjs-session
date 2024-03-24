import {
  SessionRepository,
  SessionRepositoryToken,
} from '@app/session/service/repository/session.repository';
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  UserRepository,
  UserRepositoryToken,
} from 'src/user/service/repository/user.repository';
import { NotFoundUserException } from './exception/not-found-user.exception';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    @Inject(UserRepositoryToken)
    private userRepo: UserRepository,
    @Inject(SessionRepositoryToken)
    private sessionRepo: SessionRepository,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmailAndPassword(email, password);
    this.logger.debug(JSON.stringify(user));
    if (!user) throw new NotFoundUserException();
    const sessionId = await this.sessionRepo.create(user);
    return sessionId;
  }
}
