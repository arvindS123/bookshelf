import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { BooksService } from '../books/books.service';
export declare class BorrowsService {
    private readonly booksService;
    private readonly filePath;
    constructor(booksService: BooksService);
    private readBorrows;
    private writeBorrows;
    private isOverdue;
    private getActiveBorrowCount;
    findAll(query?: {
        status?: string;
        borrowerName?: string;
        bookId?: string;
        page?: number;
        limit?: number;
    }): {
        data: {
            isOverdue: boolean;
            status: string;
            id: string;
            bookId: string;
            borrowerName: string;
            borrowDate: string;
            dueDate: string;
            returnDate: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
    findOne(id: string): {
        isOverdue: boolean;
        status: string;
        id: string;
        bookId: string;
        borrowerName: string;
        borrowDate: string;
        dueDate: string;
        returnDate: string | null;
    };
    findByBookId(bookId: string): {
        isOverdue: boolean;
        status: string;
        id: string;
        bookId: string;
        borrowerName: string;
        borrowDate: string;
        dueDate: string;
        returnDate: string | null;
    }[];
    create(dto: CreateBorrowDto): {
        isOverdue: boolean;
        status: string;
        id: string;
        bookId: string;
        borrowerName: string;
        borrowDate: string;
        dueDate: string;
        returnDate: string | null;
    };
    update(id: string, dto: UpdateBorrowDto): {
        isOverdue: boolean;
        status: string;
        id: string;
        bookId: string;
        borrowerName: string;
        borrowDate: string;
        dueDate: string;
        returnDate: string | null;
    };
    returnBook(id: string): {
        isOverdue: boolean;
        status: string;
        id: string;
        bookId: string;
        borrowerName: string;
        borrowDate: string;
        dueDate: string;
        returnDate: string | null;
    };
    remove(id: string): void;
}
