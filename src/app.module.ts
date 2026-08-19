
import { BooksModule } from './books/books.module';
import { BorrowsModule } from './borrows/borrows.module';

@Module({
  imports: [BooksModule, BorrowsModule],
})
export class AppModule {}

function Module(arg0: { imports: (typeof BooksModule)[]; }): (target: typeof AppModule, context: ClassDecoratorContext<typeof AppModule>) => void | typeof AppModule {
  throw new Error('Function not implemented.');
}
