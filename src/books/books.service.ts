import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private readonly filePath = join(process.cwd(), 'src', 'data', 'books.json');

  private readBooks(): Book[] {
    try {
      const data = readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  private writeBooks(books: Book[]): void {
    writeFileSync(this.filePath, JSON.stringify(books, null, 2), 'utf-8');
  }

  findAll(query?: {
    genre?: string;
    author?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    let books = this.readBooks();

    if (query?.genre) {
      books = books.filter((b) =>
        b.genre.toLowerCase().includes(query.genre!.toLowerCase()),
      );
    }
    if (query?.author) {
      books = books.filter((b) =>
        b.author.toLowerCase().includes(query.author!.toLowerCase()),
      );
    }
    if (query?.search) {
      const term = query.search.toLowerCase();
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(term) ||
          b.author.toLowerCase().includes(term) ||
          b.isbn.includes(term),
      );
    }

    const page = query?.page || 1;
    const limit = query?.limit || 10;
    const total = books.length;
    const start = (page - 1) * limit;
    const data = books.slice(start, start + limit);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  findOne(id: string): Book {
    const book = this.readBooks().find((b) => b.id === id);
    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);
    return book;
  }

  create(dto: CreateBookDto): Book {
    const books = this.readBooks();
    if (books.some((b) => b.isbn === dto.isbn)) {
      throw new BadRequestException('A book with this ISBN already exists');
    }

    const newBook: Book = { id: uuidv4(), ...dto };
    books.push(newBook);
    this.writeBooks(books);
    return newBook;
  }

  update(id: string, dto: UpdateBookDto): Book {
    const books = this.readBooks();
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) throw new NotFoundException(`Book with ID ${id} not found`);

    books[index] = { ...books[index], ...dto };
    this.writeBooks(books);
    return books[index];
  }

  remove(id: string): void {
    const books = this.readBooks();
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) throw new NotFoundException(`Book with ID ${id} not found`);
    books.splice(index, 1);
    this.writeBooks(books);
  }
}