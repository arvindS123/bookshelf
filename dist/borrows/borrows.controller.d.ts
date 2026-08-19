import { BorrowsService } from './borrows.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
export declare class BorrowsController {
    private readonly borrowsService;
    constructor(borrowsService: BorrowsService);
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
    findAll(status?: string, borrowerName?: string, bookId?: string, page?: number, limit?: number): {
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
    remove(id: string): {
        message: string;
    };
}
