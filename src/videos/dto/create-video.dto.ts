import { IsNotEmpty, Length } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @Length(1, 15)
  title: string;
  description: string;
  src: string;
}
