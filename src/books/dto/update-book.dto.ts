import { IsString, IsOptional, IsInt, Min, Matches, MaxLength } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  author?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(?:\d{10}|\d{13}|[\d-]{10,17})$/, {
    message: 'ISBN must be a valid 10 or 13 digit ISBN',
  })
  isbn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  genre?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  totalCopies?: number;
}