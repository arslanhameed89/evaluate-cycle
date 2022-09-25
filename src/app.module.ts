import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@/config/app.config';
import { HealthModule } from '@/shared/health/health.module';
import { V1Module } from '@/v1/v1.module';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    V1Module,
    HealthModule,
    CommandModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
