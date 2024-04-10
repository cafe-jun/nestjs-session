import { Injectable } from '@nestjs/common';

@Injectable()
export class MasterSocketCluster {
  private socketList: string[] = [];

  getSocketList(): string[] {
    return this.socketList;
  }
  setSocketList(socketId: string) {
    this.socketList = [...this.socketList, socketId];
  }

  delSocketList(socketId: string) {
    this.socketList = this.socketList.filter((socket) => socket !== socketId);
  }
}
