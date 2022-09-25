import { Module } from '@nestjs/common';
import { CycleEvaluationModule } from '@/v1/cycle-evaluation/cycle-evaluation.module';
import { KafkaCliCommandsModule } from '@/v1/kafka-cli-commands/kafka-cli-commands.module';

@Module({
  imports: [CycleEvaluationModule, KafkaCliCommandsModule],
  providers: [],
  exports: [],
})
export class V1Module {}
