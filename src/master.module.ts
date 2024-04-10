import { Module } from '@nestjs/common';
import { ProcessMessageCondition } from './common/emitter/process.emitter';
import { MasterSocketCluster } from './common/master-cluster.variable';

@Module({
  imports: [],
  controllers: [],
  providers: [ProcessMessageCondition, MasterSocketCluster],
})
export class MasterModule {}
