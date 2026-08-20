// src/services/bookService.ts
import api from './api'; // your axios instance
import type { Book, CreateBookDto } from '../types/book.types';

export const bookService = {
  getAll: (params?: any) =>
    api.get('/books', { params }).then((res) => res.data),

  getById: (id: string) =>
    api.get(`/books/${id}`).then((res) => res.data),

  getBorrows: (id: string) =>
    api.get(`/books/${id}/borrows`).then((res) => res.data),

  create: (data: CreateBookDto, coverFile?: File | null) => {
    const formData = new FormData();
    formData.append('title', data.title ? data.title.trim() : '');
    formData.append('author', data.author ? data.author.trim() : '');
    formData.append('isbn', data.isbn ? data.isbn.trim() : '');
    formData.append('genre', data.genre ? data.genre.trim() : '');
    formData.append('totalCopies', String(data.totalCopies || 1));

    if (coverFile) {
      formData.append('cover', coverFile);
    }

    return api
      .post('/books', formData)
      .then((res) => res.data);
  },

update: (id: string, data: Partial<CreateBookDto>, coverFile?: File | null) => {
    const formData = new FormData();

    if (data.title) formData.append('title', data.title.trim());
    if (data.author) formData.append('author', data.author.trim());
    if (data.isbn) formData.append('isbn', data.isbn.trim());
    if (data.genre) formData.append('genre', data.genre.trim());
    if (data.totalCopies !== undefined) {
      formData.append('totalCopies', String(data.totalCopies));
    }

    if (coverFile) {
      formData.append('cover', coverFile);
    }

    return api
      .patch(`/books/${id}`, formData)
      .then((res) => res.data);
  },
  remove: (id: string) => api.delete(`/books/${id}`).then((res) => res.data),
};