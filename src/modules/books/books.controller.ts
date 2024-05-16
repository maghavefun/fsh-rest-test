import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookCreatingDTO, BookUpdatingDTO } from 'src/core/DTO/books.dtos';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getBooks() {
    return this.booksService.getMany();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getBookByID(@Param('id') id: number) {
    return this.booksService.getByID(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UsePipes(
    new ValidationPipe({
      groups: ['create'],
    }),
  )
  async createBook(@Body() bookDTO: BookCreatingDTO) {
    return this.booksService.createBook(bookDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateBookByID(
    @Param('id') id: number,
    @Body() bookDTO: BookUpdatingDTO,
  ) {
    return this.booksService.updateBookByID(id, bookDTO);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteBookByID(@Param('id') id: number) {
    return this.booksService.deleteByID(id);
  }
}
