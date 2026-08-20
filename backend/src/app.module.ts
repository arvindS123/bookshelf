import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { BorrowsModule } from './borrows/borrows.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, BooksModule, BorrowsModule],
})
export class AppModule {}