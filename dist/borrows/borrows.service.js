"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowsService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const uuid_1 = require("uuid");
const books_service_1 = require("../books/books.service");
let BorrowsService = class BorrowsService {
    constructor(booksService) {
        this.booksService = booksService;
        this.filePath = (0, path_1.join)(process.cwd(), 'src', 'data', 'borrows.json');
    }
    readBorrows() {
        try {
            return JSON.parse((0, fs_1.readFileSync)(this.filePath, 'utf-8'));
        }
        catch {
            return [];
        }
    }
    writeBorrows(borrows) {
        (0, fs_1.writeFileSync)(this.filePath, JSON.stringify(borrows, null, 2), 'utf-8');
    }
    isOverdue(record) {
        if (record.returnDate)
            return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(record.dueDate) < today;
    }
    getActiveBorrowCount(bookId) {
        return this.readBorrows().filter((b) => b.bookId === bookId && b.returnDate === null).length;
    }
    findAll(query) {
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
            enriched = enriched.filter((b) => b.status.toLowerCase() === query.status.toLowerCase());
        }
        if (query?.borrowerName) {
            enriched = enriched.filter((b) => b.borrowerName.toLowerCase().includes(query.borrowerName.toLowerCase()));
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
    findOne(id) {
        const record = this.readBorrows().find((b) => b.id === id);
        if (!record)
            throw new common_1.NotFoundException(`Borrow record ${id} not found`);
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
    findByBookId(bookId) {
        this.booksService.findOne(bookId);
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
    create(dto) {
        const book = this.booksService.findOne(dto.bookId);
        const activeCount = this.getActiveBorrowCount(dto.bookId);
        if (activeCount >= book.totalCopies) {
            throw new common_1.BadRequestException(`No copies available. All ${book.totalCopies} copies are currently borrowed.`);
        }
        const due = new Date(dto.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (due < today) {
            throw new common_1.BadRequestException('Due date must be today or in the future');
        }
        const newRecord = {
            id: (0, uuid_1.v4)(),
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
    update(id, dto) {
        const borrows = this.readBorrows();
        const index = borrows.findIndex((b) => b.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Borrow record ${id} not found`);
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
    returnBook(id) {
        return this.update(id, {
            returnDate: new Date().toISOString().split('T')[0],
        });
    }
    remove(id) {
        const borrows = this.readBorrows();
        const index = borrows.findIndex((b) => b.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Borrow record ${id} not found`);
        borrows.splice(index, 1);
        this.writeBorrows(borrows);
    }
};
exports.BorrowsService = BorrowsService;
exports.BorrowsService = BorrowsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BorrowsService);
//# sourceMappingURL=borrows.service.js.map