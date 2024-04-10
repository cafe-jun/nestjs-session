import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

@Enum('type')
export class ProcessMessageType extends EnumType<ProcessMessageType>() {
  static readonly BLOCKED = new ProcessMessageType(3, 'Blocked');
  static readonly SOCKET_CONNECT = new ProcessMessageType(
    1,
    'sticky:connection',
  );
  static readonly SOCKET_DISCONNECT = new ProcessMessageType(
    2,
    'sticky:disconnection',
  );

  private constructor(
    readonly code: number,
    readonly type: string,
  ) {
    super();
  }
}

export type ProcessMessage = EnumConstNames<typeof ProcessMessageType>;
