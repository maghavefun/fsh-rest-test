import { books } from './../drizzle/schema';
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
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
  private readonly logger = new Logger(BooksService.name);

  async getMany() {
    try {
      this.logger.log('Receiving books from database');
      return await this.db.query.books.findMany({});
    } catch (err) {
      this.logger.error(`Error on receiving books from database\n ${err}`);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getByID(id: number) {
    try {
      this.logger.log(`Recieving book with id: ${id} from database`);
      const arrayWithBooks = await this.db
        .select()
        .from(books)
        .where(eq(books.id, id));
      if (arrayWithBooks.length === 0) {
        this.logger.error(`Book with id: ${id} not found in database`);
        throw new NotFoundException(`book with id: ${id} not found`);
      }
      return arrayWithBooks[0];
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        this.logger.error(
          `Error on receiving book from database by id: ${id}\n error: ${err}`,
        );
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  async createBook(bookDTO: BookCreatingDTO) {
    try {
      this.logger.log(`Creating book in database\n book: ${bookDTO}`);
      const arrayWithCreatedBook = await this.db
        .insert(books)
        .values(bookDTO)
        .returning();
      this.logger.log(
        `Boook succesfully created\n created book: ${arrayWithCreatedBook[0]}`,
      );
      return arrayWithCreatedBook[0];
    } catch (err) {
      this.logger.error(`Error on creating book.\n ${err}`);
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateBookByID(id: number, bookDTO: BookUpdatingDTO) {
    try {
      this.logger.log(`Updating book with id: ${id}, \n updateDTO: ${bookDTO}`);
      const arrayWithUpdatedBook = await this.db
        .update(books)
        .set(bookDTO)
        .where(eq(books.id, id))
        .returning();
      if (arrayWithUpdatedBook.length === 0) {
        this.logger.error(`Book with id: ${id} not found in database`);
        throw new NotFoundException(`book with id: ${id} not found`);
      }
      this.logger.log(
        `Book with id: ${id} succesfully updated\n updated book: ${arrayWithUpdatedBook[0]}`,
      );
      return arrayWithUpdatedBook[0];
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        this.logger.error(
          `Error on updating book with id: ${id},\n book update dto: ${bookDTO} \n error: ${err}`,
        );
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  async deleteByID(id: number) {
    try {
      this.logger.log(`Deleting book with id: ${id}`);
      const arrayWithDeletedBook = await this.db
        .delete(books)
        .where(eq(books.id, id))
        .returning();
      if (arrayWithDeletedBook.length === 0) {
        this.logger.error(
          `Error on deleting book with id: ${id} in database. Book not found`,
        );
        throw new NotFoundException(`book with id: ${id} not found`);
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        this.logger.error(`Error on deleting book with id: ${id}. err: ${err}`);
        throw new InternalServerErrorException(err.message);
      }
    }
  }
}
