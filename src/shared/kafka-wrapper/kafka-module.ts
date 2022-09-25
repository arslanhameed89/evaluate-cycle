import { Module } from '@nestjs/common';
import { KafkaWrapper } from '@/shared/kafka-wrapper/kafka-wrapper';
import { KafkaConsumer } from '@/shared/kafka-wrapper/kafka.consumer';

@Module({
  imports: [],
  providers: [KafkaWrapper, KafkaConsumer],
  exports: [KafkaWrapper, KafkaConsumer],
})
export class KafkaModule {}
