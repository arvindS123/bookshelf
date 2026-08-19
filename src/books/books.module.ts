import { Module, forwardRef } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BorrowsModule } from '../borrows/borrows.module';

@Module({
  imports: [forwardRef(() => BorrowsModule)],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}