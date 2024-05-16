import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookCreatingDTO, BookUpdatingDTO } from 'src/core/DTO/books.dtos';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}
  private readonly logger = new Logger(BooksController.name);

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOkResponse({ status: 200, description: 'The records succesfully found' })
  @ApiResponse({ status: 500, description: 'Something went wrong' })
  async getBooks() {
    this.logger.log('Handling GET request /books');
    return this.booksService.getMany();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOkResponse({ status: 200, description: 'The record succesfully found' })
  @ApiResponse({ status: 500, description: 'Something went wrong' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiParam({
    name: 'id',
    description: 'Book id as a number',
    required: true,
  })
  async getBookByID(@Param('id') id: number) {
    this.logger.log(`Handling GET request /books/${id}`);
    return this.booksService.getByID(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOkResponse({ status: 201, description: 'The record succesfully created' })
  @ApiResponse({ status: 500, description: 'Something went wrong' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
    type: BookCreatingDTO,
    description: 'Book data in JSON format for creating',
  })
  @UsePipes(
    new ValidationPipe({
      groups: ['create'],
    }),
  )
  async createBook(@Body() bookDTO: BookCreatingDTO) {
    this.logger.log('Handling POST request /books');
    return this.booksService.createBook(bookDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @ApiOkResponse({ status: 200, description: 'The record succesfully updated' })
  @ApiResponse({ status: 500, description: 'Something went wrong' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiBody({
    type: BookUpdatingDTO,
    description: 'Book data in JSON format for updating',
  })
  @ApiParam({
    name: 'id',
    description: 'Book id as a number',
    required: true,
  })
  async updateBookByID(
    @Param('id') id: number,
    @Body() bookDTO: BookUpdatingDTO,
  ) {
    this.logger.log(`Handling PUT request /books/${id}`);
    return this.booksService.updateBookByID(id, bookDTO);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOkResponse({
    status: 204,
    description: 'The record succesfully deleted. No content',
  })
  @ApiResponse({ status: 500, description: 'Something went wrong' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiParam({
    name: 'id',
    description: 'Book id as a number',
    required: true,
  })
  async deleteBookByID(@Param('id') id: number) {
    this.logger.log(`Hadnling DELETE request /books/${id}`);
    return this.booksService.deleteByID(id);
  }
}
