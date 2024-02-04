CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  pages INTEGER NOT NULL,
  isbn TEXT NOT NULL
);

CREATE TABLE book_ratings (
  id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES books(id),
  rating INTEGER NOT NULL,
  feedback TEXT
);