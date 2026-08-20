import { IsString, IsNotEmpty, IsDateString, MaxLength } from 'class-validator';

export class CreateBorrowDto {
  @IsString()
  @IsNotEmpty()
  bookId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  borrowerName!: string;

  @IsDateString()
  dueDate!: string;
}