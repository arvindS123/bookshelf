export interface BorrowRecord {
  id: string;
  bookId: string;
  borrowerName: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  isOverdue?: boolean;
  status?: 'Active' | 'Returned' | 'Overdue';
}

export interface CreateBorrowDto {
  bookId: string;
  borrowerName: string;
  dueDate: string;
}

export interface UpdateBorrowDto {
  borrowerName?: string;
  dueDate?: string;
  returnDate?: string | null;
}

export interface PaginatedBorrows {
  data: BorrowRecord[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}