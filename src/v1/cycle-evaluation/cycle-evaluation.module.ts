import { Global, Module } from '@nestjs/common';
import { CycleEvaluationController } from '@/v1/cycle-evaluation/cycle-evaluation.controller';
import { CycleEvaluationService } from '@/v1/cycle-evaluation/services/cycle-evaluation.service';
import { CycleEvaluationRepository } from '@/v1/cycle-evaluation/repository/cycle-evaluation.repository';

@Global()
@Module({
  imports: [],
  controllers: [CycleEvaluationController],
  providers: [CycleEvaluationService, CycleEvaluationRepository],
  exports: [CycleEvaluationService, CycleEvaluationRepository],
})
export class CycleEvaluationModule {}
