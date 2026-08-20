import { Module, forwardRef } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { BorrowsController } from './borrows.controller';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [forwardRef(() => BooksModule)],
  controllers: [BorrowsController],
  providers: [BorrowsService], 
  exports: [BorrowsService],
})
export class BorrowsModule {}