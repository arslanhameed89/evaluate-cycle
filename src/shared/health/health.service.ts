import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthService extends HealthIndicator {
  constructor(private readonly configService: ConfigService) {
    super();
  }
}
