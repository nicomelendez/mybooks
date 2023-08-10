import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import NoBook from "../components/utils/NoBook";
import SearchMyBooks from "../components/search/SearchMyBooks";
import ListOfBooks from "../components/book/ListOfBooks";
import useLibrary from "../hooks/useLibrary";

export default function MisLibros() {
  const { getAllMyBooks, library } = useLibrary();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Obtener los libros de la biblioteca en la renderización inicial
    const booksNew = getAllMyBooks();
    setBooks(booksNew);
  }, [library]);

  return (
    <Layout title="Biblioteca">
      <section className="py-10">
        <h2 className="text-center md:text-xl 2xl:text-3xl pb-8 font-bold">
          Biblioteca
        </h2>
        <SearchMyBooks setBooks={setBooks} />
        {books.length === 0 ? <NoBook /> : <ListOfBooks books={books} />}
      </section>
    </Layout>
  );
}
