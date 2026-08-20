import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BorrowsService } from '../borrows/borrows.service';

@Controller('books')
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly borrowsService: BorrowsService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './uploads/covers',
        filename: (req, file, cb) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed!'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    }),
  )
  create(
    @Body() dto: CreateBookDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const coverUrl = file ? `/uploads/covers/${file.filename}` : undefined;
    return this.booksService.create(dto, coverUrl);
  }

  @Get()
  findAll(
    @Query('genre') genre?: string,
    @Query('author') author?: string,
    @Query('search') search?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    return this.booksService.findAll({ genre, author, search, page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Get(':id/borrows')
  findBorrows(@Param('id') id: string) {
    return this.borrowsService.findByBookId(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './uploads/covers',
        filename: (req, file, cb) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed!'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBookDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const coverUrl = file ? `/uploads/covers/${file.filename}` : undefined;
    return this.booksService.update(id, dto, coverUrl);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.booksService.remove(id);
    return { message: `Book ${id} deleted successfully` };
  }
}