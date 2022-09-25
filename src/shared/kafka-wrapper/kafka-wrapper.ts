import {
  Consumer,
  ConsumerEvents,
  Kafka,
  logLevel,
  Partitioners,
  Producer,
  ProducerEvents,
} from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { IConsumer, IPublisher } from './kafka-pub-sub-event-params';
import { isEmpty } from 'lodash';

@Injectable()
export class KafkaWrapper {
  private readonly clientId: string;
  private readonly appName: string;
  private kafka: Kafka = {} as any;
  kafkaProducer: Producer = {} as any;
  kafkaConsumerList: Record<string, Consumer> = {};

  constructor(private readonly configService: ConfigService) {
    this.appName = this.configService.get<string>('APP.APP_NAME') || '';
    this.clientId = uuidv4();
    this.init();
  }

  init(): Kafka {
    const clientId: string = this.clientId;
    const kafkaUrl: string[] = this.configService
      .get('APP.KAFKA_QUEUE_URL')
      .split(',') || ['127.0.0.1:9092'];

    return (this.kafka = new Kafka({
      clientId,
      brokers: kafkaUrl,
      logLevel: logLevel.ERROR,
    }));
  }

  async associateToConsumer(topic: string): Promise<any> {
    if (this.kafkaConsumerList[topic]) {
      return this.kafkaConsumerList[topic];
    }

    try {
      this.kafkaConsumerList[topic] = this.kafka.consumer({
        groupId: `consumer-${this.appName}-topic-${topic}`,
      });
      await this.kafkaConsumerList[topic].connect();
    } catch (error) {
      console.error(
        `Kafka :: ${topic} consumer connect error ${JSON.stringify(error)}`,
      );
    }

    const events: ConsumerEvents = this.kafkaConsumerList[topic].events;

    this.kafkaConsumerList[topic].on(events.CONNECT, (args: any) => {
      console.debug(
        `Kafka :: ${topic} ${events.CONNECT} ${JSON.stringify(args)}`,
      );
    });
    this.kafkaConsumerList[topic].on(events.STOP, (args: any) => {
      console.debug(`Kafka :: ${topic} ${events.STOP} ${JSON.stringify(args)}`);
    });

    this.kafkaConsumerList[topic].on(events.CRASH, (args: any) => {
      console.error(`Kafka :: ${events.CRASH} ${JSON.stringify(args)}`);
    });

    this.kafkaConsumerList[topic].on(events.REQUEST_TIMEOUT, (args: any) => {
      console.debug(
        `Kafka :: ${topic} ${events.REQUEST_TIMEOUT} ${JSON.stringify(args)}`,
      );
    });
  }

  async associateToPublisher(): Promise<any> {
    if (!isEmpty(this.kafkaProducer)) {
      return this.kafkaProducer;
    }

    try {
      this.kafkaProducer = this.kafka.producer({
        createPartitioner: Partitioners.LegacyPartitioner,
        allowAutoTopicCreation: true,
        transactionTimeout: 30000,
      });
      await this.kafkaProducer.connect();
    } catch (error) {
      console.error(`Kafka :: producer connect error ${JSON.stringify(error)}`);
    }

    const events: ProducerEvents = this.kafkaProducer.events;

    this.kafkaProducer.on(events.CONNECT, (args: any) => {
      console.info(`Kafka :: connected ${JSON.stringify(args)}`);
    });

    this.kafkaProducer.on(events.DISCONNECT, (args: any) => {
      console.warn(`Kafka :: connection closed ${JSON.stringify(args)}`);
    });

    this.kafkaProducer.on(events.REQUEST_TIMEOUT, (args: any) => {
      console.error(
        `Kafka :: ${events.REQUEST_TIMEOUT} ${JSON.stringify(args)}`,
      );
    });
  }

  async publishMessage(params: IPublisher): Promise<void | never> {
    try {
      await this.associateToPublisher();
      await this.kafkaProducer.send({
        topic: params.topic,
        messages: [
          {
            value: JSON.stringify(params.data),
            headers: params?.headers,
          },
        ],
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async consumeMessages(
    topic: string,
    callback: (params: IConsumer) => Promise<void | never>,
  ): Promise<any> {
    try {
      await this.associateToConsumer(topic);
      await this.kafkaConsumerList[topic].subscribe({
        topic,
        fromBeginning: false,
      });
      await this.kafkaConsumerList[topic].run({ eachBatch: callback });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
