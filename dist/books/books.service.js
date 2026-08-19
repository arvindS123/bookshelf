"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const uuid_1 = require("uuid");
let BooksService = class BooksService {
    constructor() {
        this.filePath = (0, path_1.join)(process.cwd(), 'src', 'data', 'books.json');
    }
    readBooks() {
        try {
            const data = (0, fs_1.readFileSync)(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch {
            return [];
        }
    }
    writeBooks(books) {
        (0, fs_1.writeFileSync)(this.filePath, JSON.stringify(books, null, 2), 'utf-8');
    }
    findAll(query) {
        let books = this.readBooks();
        if (query?.genre) {
            books = books.filter((b) => b.genre.toLowerCase().includes(query.genre.toLowerCase()));
        }
        if (query?.author) {
            books = books.filter((b) => b.author.toLowerCase().includes(query.author.toLowerCase()));
        }
        if (query?.search) {
            const term = query.search.toLowerCase();
            books = books.filter((b) => b.title.toLowerCase().includes(term) ||
                b.author.toLowerCase().includes(term) ||
                b.isbn.includes(term));
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
    findOne(id) {
        const book = this.readBooks().find((b) => b.id === id);
        if (!book)
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        return book;
    }
    create(dto) {
        const books = this.readBooks();
        if (books.some((b) => b.isbn === dto.isbn)) {
            throw new common_1.BadRequestException('A book with this ISBN already exists');
        }
        const newBook = { id: (0, uuid_1.v4)(), ...dto };
        books.push(newBook);
        this.writeBooks(books);
        return newBook;
    }
    update(id, dto) {
        const books = this.readBooks();
        const index = books.findIndex((b) => b.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        books[index] = { ...books[index], ...dto };
        this.writeBooks(books);
        return books[index];
    }
    remove(id) {
        const books = this.readBooks();
        const index = books.findIndex((b) => b.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        books.splice(index, 1);
        this.writeBooks(books);
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)()
], BooksService);
//# sourceMappingURL=books.service.js.map