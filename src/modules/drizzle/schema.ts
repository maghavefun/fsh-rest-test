import { date, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  author: varchar('author', { length: 256 }).notNull(),
  published_date: date('published_date'),
  isbn: varchar('isbn').unique(),
  pages: integer('pages'),
});
