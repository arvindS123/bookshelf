import api from './api';
import type {
  BorrowRecord,
  CreateBorrowDto,
  UpdateBorrowDto,
  PaginatedBorrows,
} from '../types/borrow.types';

export const borrowService = {
  getAll: async (params?: {
    status?: string;
    borrowerName?: string;
    bookId?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedBorrows> => {
    const { data } = await api.get('/borrows', { params });
    return data;
  },

  getById: async (id: string): Promise<BorrowRecord> => {
    const { data } = await api.get(`/borrows/${id}`);
    return data;
  },

  create: async (dto: CreateBorrowDto): Promise<BorrowRecord> => {
    const { data } = await api.post('/borrows', dto);
    return data;
  },

  update: async (id: string, dto: UpdateBorrowDto): Promise<BorrowRecord> => {
    const { data } = await api.patch(`/borrows/${id}`, dto);
    return data;
  },

  returnBook: async (id: string): Promise<BorrowRecord> => {
    const { data } = await api.patch(`/borrows/${id}/return`);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/borrows/${id}`);
  },
};