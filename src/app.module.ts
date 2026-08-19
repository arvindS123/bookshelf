
import { BooksModule } from './books/books.module';
import { BorrowsModule } from './borrows/borrows.module';

@Module({
  imports: [BooksModule, BorrowsModule],
})
export class AppModule {}

