import { Worker } from 'cluster';
import { ProcessMessage, ProcessMessageType } from './message.type';
import { Global, Injectable, Logger } from '@nestjs/common';
import { MasterSocketCluster } from '../master-cluster.variable';

@Global()
@Injectable()
export class ProcessMessageCondition {
  private logger = new Logger(ProcessMessageCondition.name);
  constructor(private masterSocketCluster: MasterSocketCluster) {}
  setEvent(worker: Worker) {
    worker.on('message', (message) => {
      const { type, data } = message;
      console.log(`proccess message ${JSON.stringify(message)}`);
      this.processMessageEvent(type, data);
    });
    worker.on('error', (err) => {
      this.processErrorEvent(err);
    });
    worker.on('exit', () => {
      this.logger.error(`worker die ${process.pid}`);
    });
  }

  processMessageEvent(type: ProcessMessage, data: any) {
    switch (type) {
      case '' + ProcessMessageType.SOCKET_CONNECT:
        this.masterSocketCluster.setSocketList(data);
        return;
      case '' + ProcessMessageType.SOCKET_DISCONNECT:
        this.masterSocketCluster.delSocketList(data);
        return;
      default:
        console.log(type);
    }
    const socketList = this.masterSocketCluster.getSocketList();
    console.log(`current socket List ${JSON.stringify(socketList)}`);
  }
  processErrorEvent(err) {}
}
