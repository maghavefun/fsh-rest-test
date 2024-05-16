CREATE TABLE IF NOT EXISTS "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"author" varchar(256) NOT NULL,
	"published_date" date,
	"isbn" varchar,
	"pages" integer,
	CONSTRAINT "books_isbn_unique" UNIQUE("isbn")
);
