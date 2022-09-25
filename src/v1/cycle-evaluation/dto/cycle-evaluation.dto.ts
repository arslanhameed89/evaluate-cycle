import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class CycleEvaluationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  input: Record<string, number[]>;
}
