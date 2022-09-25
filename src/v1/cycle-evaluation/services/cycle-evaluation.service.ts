import { Injectable } from '@nestjs/common';
import { CycleEvaluationRepository } from '@/v1/cycle-evaluation/repository/cycle-evaluation.repository';
import { CycleEvaluationDto } from '@/v1/cycle-evaluation/dto/cycle-evaluation.dto';

@Injectable()
export class CycleEvaluationService {
  constructor(private cycleEvaluationRepository: CycleEvaluationRepository) {}

  evaluateCycle(items: number[]): boolean {
    if (items.length === 0) return true;

    let nextIndex = 0;
    let lastVisitedIndex = 0;
    const cycleStartIndex = 0;
    let visited: number = items.length;
    do {
      lastVisitedIndex = nextIndex;
      nextIndex = items[nextIndex];
      visited -= 1;
      if (nextIndex === lastVisitedIndex) {
        continue;
      }

      if (cycleStartIndex === nextIndex) {
        return true;
      }
    } while (visited > 0);

    return false;
  }

  process(cycleEvaluationDto: CycleEvaluationDto): Record<string, boolean> {
    try {
      const output: Record<string, boolean> = {};
      for (const [key, value] of Object.entries(cycleEvaluationDto.input)) {
        output[key] = this.evaluateCycle(value);
      }
      return output;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
