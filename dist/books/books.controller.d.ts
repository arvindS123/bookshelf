import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BorrowsService } from '../borrows/borrows.service';
export declare class BooksController {
    private readonly booksService;
    private readonly borrowsService;
    constructor(booksService: BooksService, borrowsService: BorrowsService);
    create(dto: CreateBookDto): import("./entities/book.entity").Book;
    findAll(genre?: string, author?: string, search?: string, page?: number, limit?: number): {
        data: import("./entities/book.entity").Book[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
    findOne(id: string): import("./entities/book.entity").Book;
    findBorrows(id: string): {
        isOverdue: boolean;
        status: string;
        id: string;
        bookId: string;
        borrowerName: string;
        borrowDate: string;
        dueDate: string;
        returnDate: string | null;
    }[];
    update(id: string, dto: UpdateBookDto): import("./entities/book.entity").Book;
    remove(id: string): {
        message: string;
    };
}
