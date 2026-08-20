export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  totalCopies: number;
  coverUrl?: string;          
}

export interface CreateBookDto {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  totalCopies: number;
}

export interface UpdateBookDto {
  title?: string;
  author?: string;
  isbn?: string;
  genre?: string;
  totalCopies?: number;
}

export interface PaginatedBooks {
  data: Book[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}