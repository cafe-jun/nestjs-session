import { User } from '@prisma/client';

export const UserRepositoryToken = 'UserRepositoryToken';

export interface UserRepository {
  findByEmailAndPassword(email: string, password: string): Promise<User>;
  findById(id: number): Promise<User>;
}
