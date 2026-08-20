import { IsString, IsOptional, IsDateString, MaxLength } from 'class-validator';

export class UpdateBorrowDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  borrowerName?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsDateString()
  returnDate?: string | null;
}