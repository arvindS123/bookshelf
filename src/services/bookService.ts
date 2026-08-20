import api from './api';
import type { Book, CreateBookDto, UpdateBookDto, PaginatedBooks } from '../types/book.types';
import type { BorrowRecord } from '../types/borrow.types';

export const bookService = {
  getAll: async (params?: {
    genre?: string;
    author?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedBooks> => {
    const { data } = await api.get('/books', { params });
    return data;
  },

  getById: async (id: string): Promise<Book> => {
    const { data } = await api.get(`/books/${id}`);
    return data;
  },

  getBorrows: async (id: string): Promise<BorrowRecord[]> => {
    const { data } = await api.get(`/books/${id}/borrows`);
    return data;
  },

  create: async (dto: CreateBookDto): Promise<Book> => {
    const { data } = await api.post('/books', dto);
    return data;
  },

  update: async (id: string, dto: UpdateBookDto): Promise<Book> => {
    const { data } = await api.patch(`/books/${id}`, dto);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/books/${id}`);
  },
};