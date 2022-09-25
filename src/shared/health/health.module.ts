import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HttpModule } from '@nestjs/axios'
import { HealthCheckController } from '@/shared/health/health-check.controller'
import { HealthService } from '@/shared/health/health.service'

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthCheckController],
  providers: [HealthService],
  exports: []
})
export class HealthModule {}
