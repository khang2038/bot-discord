import { IsOptional, IsString } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class CreateTodoDto {
  @IsString()
  @IsNotBlank()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotBlank()
  owner: string;

  @IsString()
  @IsNotBlank()
  userTarget: string;

  @IsString()
  @IsNotBlank()
  chanel:string;
}