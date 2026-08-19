import { IsString, IsNotEmpty, IsInt, Min, Matches, MaxLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  author!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?:\d{10}|\d{13}|[\d-]{10,17})$/, {
    message: 'ISBN must be a valid 10 or 13 digit ISBN',
  })
  isbn!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  genre!: string;

  @IsInt()
  @Min(1)
  totalCopies!: number;
}