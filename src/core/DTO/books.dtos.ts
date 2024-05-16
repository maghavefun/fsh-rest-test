import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class BookCreatingDTO {
  @ApiProperty({
    example: 'Кратчайшая история времени',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ groups: ['create'] })
  @Length(2, 256)
  title: string;

  @ApiProperty({
    example: 'Стивен Хокинг',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ groups: ['create'] })
  @Length(2, 256)
  author: string;

  @ApiProperty({
    example: '2005-01-01',
    required: false,
  })
  @IsDateString()
  published_date: string;

  @ApiProperty({
    example: '0-553-80436-7',
    required: false,
  })
  @IsString()
  isbn: string;

  @ApiProperty({
    example: 150,
    required: false,
  })
  @IsInt()
  @Min(1)
  pages: number;
}

export class BookUpdatingDTO {
  @ApiProperty({
    example: 'Кратчайшая история времени',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(2, 256)
  title?: string;

  @ApiProperty({
    example: 'Стивен Хокинг',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(2, 256)
  author?: string;

  @ApiProperty({
    example: '2005-01-01',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  published_date?: string;

  @ApiProperty({
    example: '0-553-80436-7',
    required: false,
  })
  @IsString()
  @IsOptional()
  isbn?: string;

  @ApiProperty({
    example: 150,
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  pages?: number;
}
