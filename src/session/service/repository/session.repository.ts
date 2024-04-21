import { Session } from '../model/session.model';

export const SessionRepositoryToken = 'SessionRepositoryToken';
export interface SessionRepository {
  create(sessionDate: any): Promise<string>;
  getById(): Promise<Session>;
  getAll(): Promise<string[]>;
  update(sessionId: string, sessionDate: any): Promise<void>;
  remove(sessionId: string): Promise<void>;
}
