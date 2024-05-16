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
  @IsString()
  @IsNotEmpty({ groups: ['create'] })
  @Length(2, 256)
  title: string;

  @IsString()
  @IsNotEmpty({ groups: ['create'] })
  @Length(2, 256)
  author: string;

  @IsDateString()
  published_date: string;

  @IsString()
  isbn: string;

  @IsInt()
  @Min(1)
  pages: number;
}

export class BookUpdatingDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(2, 256)
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(2, 256)
  author?: string;

  @IsDateString()
  @IsOptional()
  published_date?: string;

  @IsString()
  @IsOptional()
  isbn?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  pages?: number;
}
