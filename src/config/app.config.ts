import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();
const env = process.env;

export default registerAs('APP', () => ({
  HOST: env.HOST || '127.0.0.1',
  PORT: env.PORT ? parseInt(env.PORT, 10) : 3900,
  SERVER: env.SERVER || 'http://localhost:3900',
  APP_NAME: env.APP_NAME || 'evalute-cycle',
  API_GLOBAL_PREFIX: env.API_GLOBAL_PREFIX || 'api/v1',
  NODE_ENV: env.NODE_ENV || 'development',
  KAFKA_QUEUE_URL: env.KAFKA_QUEUE_URL || '127.0.0.1:9092',
}));
