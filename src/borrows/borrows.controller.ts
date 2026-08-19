import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BorrowsService } from './borrows.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';

@Controller('borrows')
@UseGuards(JwtAuthGuard)
export class BorrowsController {
  constructor(private readonly borrowsService: BorrowsService) {}

  @Post()
  create(@Body() dto: CreateBorrowDto) {
    return this.borrowsService.create(dto);
  }

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('borrowerName') borrowerName?: string,
    @Query('bookId') bookId?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    return this.borrowsService.findAll({ status, borrowerName, bookId, page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBorrowDto) {
    return this.borrowsService.update(id, dto);
  }

  @Patch(':id/return')
  returnBook(@Param('id') id: string) {
    return this.borrowsService.returnBook(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.borrowsService.remove(id);
    return { message: `Borrow record ${id} deleted successfully` };
  }
}