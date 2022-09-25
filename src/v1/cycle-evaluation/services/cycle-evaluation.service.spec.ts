import { CycleEvaluationController } from '@/v1/cycle-evaluation/cycle-evaluation.controller';
import { CycleEvaluationService } from '@/v1/cycle-evaluation/services/cycle-evaluation.service';
import { CycleEvaluationRepository } from '@/v1/cycle-evaluation/repository/cycle-evaluation.repository';
import { Test } from '@nestjs/testing';

describe('Cycle evaluation testsuits', () => {
  let cycleEvaluationService: CycleEvaluationService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [CycleEvaluationController],
      providers: [CycleEvaluationService, CycleEvaluationRepository],
      exports: [CycleEvaluationService, CycleEvaluationRepository],
    }).compile();

    cycleEvaluationService = moduleRef.get<CycleEvaluationService>(
      CycleEvaluationService,
    );
  });

  it.each([[[3, 0, 1, 2]], [[]]])(
    'should validate the cycle %p',
    (...options) => {
      const [given] = options;
      expect(cycleEvaluationService.evaluateCycle(given)).toBeTruthy();
    },
  );

  it.each([[[3, 5, 1, 2]], [[0, 9]]])(
    'should not validate the cycle %p',
    (...options) => {
      const [given] = options;
      expect(cycleEvaluationService.evaluateCycle(given)).toBeFalsy();
    },
  );
});
