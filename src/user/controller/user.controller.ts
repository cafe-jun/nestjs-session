import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller()
export class UserController {
  constructor(@InjectQueue('jobQueue') private readonly jobQueue: Queue) {}
  @Post()
  create() {}
}
