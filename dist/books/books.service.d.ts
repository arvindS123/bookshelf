import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksService {
    private readonly filePath;
    private readBooks;
    private writeBooks;
    findAll(query?: {
        genre?: string;
        author?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): {
        data: Book[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
    findOne(id: string): Book;
    create(dto: CreateBookDto): Book;
    update(id: string, dto: UpdateBookDto): Book;
    remove(id: string): void;
}
