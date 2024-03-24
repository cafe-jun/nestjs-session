import { BaseException } from '@app/common/exception/base.exception';
import { HttpStatus } from '@nestjs/common';

export class NotFoundUserException extends BaseException {
  constructor() {
    super('일치하는 유저가 없습니다', HttpStatus.NOT_FOUND);
  }
}
