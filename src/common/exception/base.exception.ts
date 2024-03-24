import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    this.statusCode = statusCode;
    this.message = message;
  }

  statusCode: number;

  message: string;
}
