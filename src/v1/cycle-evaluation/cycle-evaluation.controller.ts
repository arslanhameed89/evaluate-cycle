import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CycleEvaluationService } from './services/cycle-evaluation.service';
import { CycleEvaluationDto } from '@/v1/cycle-evaluation/dto/cycle-evaluation.dto';

@Controller('cycle-evaluation')
@ApiTags('Cycle-Evaluation')
export class CycleEvaluationController {
  constructor(private cycleEvaluationService: CycleEvaluationService) {}

  /**
   * @param cycleEvaluationDto
   * @example  {
   *       "input": {
   *       "list1": [1, 2, 3],
   *       "list2": [0, 2, 5],
   *       "list3": [3, 0, 1, 2],
   *       "list4": [4, 0, 3, 1, 2],
   *       "list5": [5, 4, 0, 2, 3, 1],
   *       "listn": []
   *     }
   * }
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  async cycleEvaluation(
    @Body() cycleEvaluationDto: CycleEvaluationDto,
  ): Promise<any> {
    return this.cycleEvaluationService.process(cycleEvaluationDto);
  }
}
