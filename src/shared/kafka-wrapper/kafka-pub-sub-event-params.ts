import { EachBatchPayload } from 'kafkajs';

export interface IPublisher {
  topic: string;
  data: Record<string, any>;
  headers?: Record<string, any>;
}

export type IConsumer = EachBatchPayload;
