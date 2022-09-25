import { Module } from '@nestjs/common';
import { KafkaProducerCommand } from '@/v1/kafka-cli-commands/kafka-producer-command';
import { KafkaModule } from '@/shared/kafka-wrapper/kafka-module';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [KafkaProducerCommand],
  exports: [],
})
export class KafkaCliCommandsModule {}
