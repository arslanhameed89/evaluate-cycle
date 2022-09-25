import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { KafkaWrapper } from '@/shared/kafka-wrapper/kafka-wrapper';
import * as testData from '@/v1/kafka-cli-commands/test-json/test.json';
import { KafkaTopicsConstant } from '@/shared/kafka-wrapper/kafka-topics.constant';
@Injectable()
export class KafkaProducerCommand {
  constructor(private kafkaWrapper: KafkaWrapper) {}

  @Command({
    command: 'kafka:publish-data-to-kafka-topic',
    describe: 'take test json and publish to kafka specific topic',
  })
  async publish(): Promise<void> {
    try {
      await this.kafkaWrapper.publishMessage({
        topic: KafkaTopicsConstant.CYCLE_EVALUATION,
        data: testData,
      });
      console.log(
        `Message published to topic ${KafkaTopicsConstant.CYCLE_EVALUATION}`,
      );
    } catch (e) {
      console.info('error while publishing event to kafka topic', e);
    }
    process.exit(1);
  }
}
