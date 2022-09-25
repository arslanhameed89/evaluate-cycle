import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaTopicsConstant } from '@/shared/kafka-wrapper/kafka-topics.constant';
import { IConsumer } from '@/shared/kafka-wrapper/kafka-pub-sub-event-params';
import { KafkaWrapper } from '@/shared/kafka-wrapper/kafka-wrapper';

@Injectable()
export class KafkaConsumer implements OnModuleInit {
  constructor(private kafkaWrapper: KafkaWrapper) {}

  async onModuleInit() {
    await this.subscribeEvaluationTopic();
  }

  async subscribeEvaluationTopic(): Promise<void> {
    try {
      await this.kafkaWrapper.consumeMessages(
        KafkaTopicsConstant.CYCLE_EVALUATION,
        KafkaConsumer.processEvaluations,
      );
      console.info('subscriber registered');
    } catch (e) {
      console.info(' evaluation consumer error', e);
      throw e;
    }
  }

  private static async processEvaluations(params: IConsumer): Promise<void> {
    try {
      const { batch, heartbeat } = params;
      const { messages } = batch;
      const running = false;

      let startIndex = 0;
      const chunkSize = 50;
      do {
        for (const message of messages.splice(startIndex, chunkSize)) {
          console.info(
            '============= SUBSCRIBER RECEIVED=========== \n',
            message?.value?.toString(),
          );
          await heartbeat();
        }
        startIndex += chunkSize;
      } while (running);
    } catch (e) {
      console.info(' evaluation consumer error', e);
      throw e;
    }
  }
}
