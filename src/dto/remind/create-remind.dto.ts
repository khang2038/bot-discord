import { IsEnum, IsNumberString, IsOptional, IsString } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";
import { EDayOfWeek } from "src/interfaces/remind.interface";

export class CreateRemindDto {
  @IsString()
  @IsNotBlank()
  content: string;

  @IsNumberString()
  @IsOptional()
  month: string;

  @IsNumberString()
  @IsNotBlank()
  dayOfMonth: string;

  @IsString()
  @IsEnum(EDayOfWeek)
  dayOfWeek: string;

  @IsNumberString()
  hours: string;

  @IsNumberString()
  minute: string;
}
