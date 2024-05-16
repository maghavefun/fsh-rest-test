import { books } from './../drizzle/schema';
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import * as schema from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { BookCreatingDTO, BookUpdatingDTO } from 'src/core/DTO/books.dtos';

@Injectable()
export class BooksService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async getMany() {
    try {
      return await this.db.query.books.findMany({});
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async getByID(id: number) {
    try {
      const arrayWithBooks = await this.db
        .select()
        .from(books)
        .where(eq(books.id, id));
      if (arrayWithBooks.length === 0) {
        throw new NotFoundException(`book with id: ${id} not found`);
      }
      return arrayWithBooks[0];
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  async createBook(bookDTO: BookCreatingDTO) {
    try {
      const arrayWithCreatedBook = await this.db
        .insert(books)
        .values(bookDTO)
        .returning();
      return arrayWithCreatedBook[0];
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateBookByID(id: number, bookDTO: BookUpdatingDTO) {
    try {
      const arrayWithUpdatedBook = await this.db
        .update(books)
        .set(bookDTO)
        .where(eq(books.id, id))
        .returning();
      if (arrayWithUpdatedBook.length === 0) {
        throw new NotFoundException(`book with id: ${id} not found`);
      }
      return arrayWithUpdatedBook[0];
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  async deleteByID(id: number) {
    try {
      const arrayWithDeletedBook = await this.db
        .delete(books)
        .where(eq(books.id, id))
        .returning();
      if (arrayWithDeletedBook.length === 0) {
        throw new NotFoundException(`book with id: ${id} not found`);
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }
}
