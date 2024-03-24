import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { UserRepository } from '../service/repository/user.repository';

@Injectable()
export class UserRepositoryImpl extends PrismaClient implements UserRepository {
  async findByEmailAndPassword(email: string, password: string): Promise<User> {
    return this.user.findFirst({
      where: {
        email,
        password,
      },
    });
  }
  findById(id: number): Promise<User> {
    return this.user.findFirst({
      where: {
        id,
      },
    });
  }
}
