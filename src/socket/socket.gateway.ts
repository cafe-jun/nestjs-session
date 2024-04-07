import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { setupWorker } from '@socket.io/sticky';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  transports: ['polling', 'websocket'],
})
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;
  private logger = new Logger(SocketGateway.name);

  afterInit(server: Server) {
    setupWorker(server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.debug(`connect socket id : ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(client.id);
  }
}
