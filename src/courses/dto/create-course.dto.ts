import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsUrl()
  coverImage: string;
}
