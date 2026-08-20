import {
  Injectable, NotFoundException, BadRequestException,
} from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { BorrowRecord } from './entities/borrow.entity';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { BooksService } from '../books/books.service';

@Injectable()
export class BorrowsService {
  private readonly filePath = join(process.cwd(), 'src', 'data', 'borrows.json');

  constructor(private readonly booksService: BooksService) {}

  private readBorrows(): BorrowRecord[] {
    try {
      return JSON.parse(readFileSync(this.filePath, 'utf-8'));
    } catch {
      return [];
    }
  }

  private writeBorrows(borrows: BorrowRecord[]): void {
    writeFileSync(this.filePath, JSON.stringify(borrows, null, 2), 'utf-8');
  }

  private isOverdue(record: BorrowRecord): boolean {
    if (record.returnDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(record.dueDate) < today;
  }

  private getActiveBorrowCount(bookId: string): number {
    return this.readBorrows().filter(
      (b) => b.bookId === bookId && b.returnDate === null,
    ).length;
  }

  findAll(query?: {
    status?: string;
    borrowerName?: string;
    bookId?: string;
    page?: number;
    limit?: number;
  }) {
    let enriched = this.readBorrows().map((b) => ({
      ...b,
      isOverdue: this.isOverdue(b),
      status: b.returnDate
        ? 'Returned'
        : this.isOverdue(b)
          ? 'Overdue'
          : 'Active',
    }));

    if (query?.status) {
      enriched = enriched.filter(
        (b) => b.status.toLowerCase() === query.status!.toLowerCase(),
      );
    }
    if (query?.borrowerName) {
      enriched = enriched.filter((b) =>
        b.borrowerName.toLowerCase().includes(query.borrowerName!.toLowerCase()),
      );
    }
    if (query?.bookId) {
      enriched = enriched.filter((b) => b.bookId === query.bookId);
    }

    const page = query?.page || 1;
    const limit = query?.limit || 10;
    const total = enriched.length;
    const data = enriched.slice((page - 1) * limit, page * limit);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  findOne(id: string) {
    const record = this.readBorrows().find((b) => b.id === id);
    if (!record) throw new NotFoundException(`Borrow record ${id} not found`);
    return {
      ...record,
      isOverdue: this.isOverdue(record),
      status: record.returnDate
        ? 'Returned'
        : this.isOverdue(record)
          ? 'Overdue'
          : 'Active',
    };
  }

  findByBookId(bookId: string) {
    this.booksService.findOne(bookId); // throws if not found
    return this.readBorrows()
      .filter((b) => b.bookId === bookId)
      .map((b) => ({
        ...b,
        isOverdue: this.isOverdue(b),
        status: b.returnDate
          ? 'Returned'
          : this.isOverdue(b)
            ? 'Overdue'
            : 'Active',
      }));
  }

  create(dto: CreateBorrowDto) {
    const book = this.booksService.findOne(dto.bookId);

    // Edge case: block when no copies available
    const activeCount = this.getActiveBorrowCount(dto.bookId);
    if (activeCount >= book.totalCopies) {
      throw new BadRequestException(
        `No copies available. All ${book.totalCopies} copies are currently borrowed.`,
      );
    }

    const due = new Date(dto.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (due < today) {
      throw new BadRequestException('Due date must be today or in the future');
    }

    const newRecord: BorrowRecord = {
      id: uuidv4(),
      bookId: dto.bookId,
      borrowerName: dto.borrowerName,
      borrowDate: new Date().toISOString().split('T')[0],
      dueDate: dto.dueDate,
      returnDate: null,
    };

    const borrows = this.readBorrows();
    borrows.push(newRecord);
    this.writeBorrows(borrows);

    return { ...newRecord, isOverdue: false, status: 'Active' };
  }

  update(id: string, dto: UpdateBorrowDto) {
    const borrows = this.readBorrows();
    const index = borrows.findIndex((b) => b.id === id);
    if (index === -1) throw new NotFoundException(`Borrow record ${id} not found`);

    borrows[index] = { ...borrows[index], ...dto };
    this.writeBorrows(borrows);

    const updated = borrows[index];
    return {
      ...updated,
      isOverdue: this.isOverdue(updated),
      status: updated.returnDate
        ? 'Returned'
        : this.isOverdue(updated)
          ? 'Overdue'
          : 'Active',
    };
  }

  returnBook(id: string) {
    return this.update(id, {
      returnDate: new Date().toISOString().split('T')[0],
    });
  }

  remove(id: string): void {
    const borrows = this.readBorrows();
    const index = borrows.findIndex((b) => b.id === id);
    if (index === -1) throw new NotFoundException(`Borrow record ${id} not found`);
    borrows.splice(index, 1);
    this.writeBorrows(borrows);
  }
}