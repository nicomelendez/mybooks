import React from "react";
import Book from "@/components/book/Book";
import Cargando from "@/components/utils/Cargando";

export default function ListOfBooks({ books }) {
  if (!books || books?.length === 0) {
    return (
      <section className="flex items-center justify-center">
        <Cargando />
      </section>
    );
  }
  return (
    <section className="grid two-columns sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
      {books.map(({ book, rating, status }) => {
        const { title, cover, genre, synopsis, ISBN, author } = book;
        return (
          <Book
            key={ISBN}
            title={title}
            cover={cover}
            genre={genre}
            synopsis={synopsis}
            ISBN={ISBN}
            rating={rating}
            status={status}
            author={author}
          />
        );
      })}
    </section>
  );
}
