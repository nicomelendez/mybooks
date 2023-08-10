import { useRouter } from "next/router";
import Layout from "../layout/Layout";
import NoFound from "../components/utils/NoFound";
import ListOfReviews from "../components/review/ListOfReviews";
import AddReview from "../components/review/AddReview";
import RegistrarUsuario from "../components/auth/RegistrarUsuario";
import { BackIcon, EnBibliotecaIcon } from "../components/utils/Icons";
import StatusBook from "../components/book/StatusBook";
import { renderRatingIcons } from "../components/utils/renderRatingIcons";
import useLibrary from "../hooks/useLibrary";
import { BookStatus } from "../context/helpers/interfaces/types";
import { toastSucess } from "../context/helpers/toast/sucess";
import { useState } from "react";

export default function Book() {
  const { changeStatusBook, changeRoute, getUserAuth, searchBookForISBN } =
    useLibrary();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const router = useRouter();
  const { ISBN } = router.query;

  const data = searchBookForISBN(ISBN);

  if (data == null) {
    return (
      <Layout title={`Libro no encotrado`}>
        <NoFound />
      </Layout>
    );
  }

  const handleDeleteBook = () => {
    toastSucess("✅ Libro quitado!");
    changeStatusBook(BookStatus.NOT_READ, ISBN);
  };

  const handleAddBook = () => {
    toastSucess("✅ Libro agregado!");
    changeStatusBook(BookStatus.IN_LIBRARY, ISBN);
  };

  const { status, stock, rating } = data;
  const { title, pages, genre, cover, synopsis, year, author } = data.book;

  const handleReadMoreClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription = synopsis.slice(0, 250);
  const displayDescription = showFullDescription
    ? synopsis
    : truncatedDescription + (synopsis.length > 250 ? "..." : "");
  return (
    <Layout title={`${title}`}>
      <main className="flex flex-col items-center md:items-start gap-y-5 animate-fade-down animate-once animate-duration-300 animate-fade">
        <div className="mx-auto hover:scale-125 transition-all">
          <button onClick={() => changeRoute("/")} className="pt-5 scale-125">
            <BackIcon />
          </button>
        </div>

        <div className="flex flex-col items-center justify-between xl:justify-around md:gap-x-20 md:items-start md:flex-row w-full">
          <div className="flex flex-col gap-y-5 md:w-2/6 w-full md:max-w-[330px]">
            <picture className="mx-auto">
              <img
                className="aspect-[2000/3227] w-[190px] rounded-r-3xl"
                src={cover}
                alt={`Portada de ${title}`}
                // style={{ viewTransitionName: `book-${ISBN}` }}
              />
            </picture>

            <div className="flex flex-col gap-y-5 w-[300px] mx-auto pb-10">
              <div className="flex flex-col items-center">
                {status === BookStatus.NOT_READ ? (
                  <button
                    onClick={handleAddBook}
                    type="button"
                    className="flex items-center justify-center w-full gap-x-2 bg-white px-3 py-2 rounded-lg text-sm font-semibold"
                  >
                    <EnBibliotecaIcon size={"w-[18px] h-[18px]"} /> Guardar
                  </button>
                ) : (
                  <button
                    onClick={handleDeleteBook}
                    type="button"
                    className="flex items-center justify-center gap-x-2 w-full bg-white px-3 py-2 rounded-lg text-sm font-semibold"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-[18px] h-[18px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"
                      />
                    </svg>
                    Quitar
                  </button>
                )}
              </div>
              <StatusBook status={status} ISBN={ISBN} />
            </div>
          </div>

          <aside className="w-full px-10 md:px-0 flex flex-col gap-y-5">
            <div className="md:w-4/5">
              <h2 className="flex w-full font-bold md:text-lg items-center justify-between">
                {title}
                <span className="text-black flex bg-white px-2 py-2 text-2xs text-center font-bold md:px-3 md:py-2 rounded">
                  {genre}
                </span>
              </h2>
            </div>

            <div className="flex text-amber-500">
              {renderRatingIcons(rating, "w-5 h-5 ")}
            </div>
            <p>
              <strong className="text-xs md:text-sm">Autor:</strong>{" "}
              <span className="text-xs md:text-sm">{author.name}</span>
            </p>
            <p>
              <strong className="text-xs md:text-sm">Año:</strong>{" "}
              <span className="text-xs md:text-sm">{year}</span>
            </p>
            <p>
              <strong className="text-xs md:text-sm">Paginas:</strong>{" "}
              <span className="text-xs md:text-sm">{pages}</span>
            </p>
            {/* <p className="w-[55ch]">{synopsis}</p> */}
            <p className="text-gray-700 pb-2 text-xs md:text-sm md:w-[60ch]">
              {displayDescription}
            </p>

            {synopsis.length > 150 && (
              <button
                onClick={handleReadMoreClick}
                className="block text-xs md:text-sm font-medium text-left text-blue-600 hover:underline"
              >
                {showFullDescription ? "Ocultar" : "Ver más"}
              </button>
            )}
            {getUserAuth() === null ? (
              <div className="md:px-10">
                <RegistrarUsuario isOpen={false} />
              </div>
            ) : (
              <AddReview ISBN={ISBN} />
            )}
            <ListOfReviews ISBN={ISBN} />
          </aside>
        </div>
      </main>
    </Layout>
  );
}

{
  /* <Layout title={`${title}`}>
<main className="flex flex-col items-center md:items-start gap-y-5">
  <div className="">
    <button
      onClick={() => changeRoute("/")}
      className="text-black bg-white hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-sm p-3 text-center inline-flex items-center "
    >
      <BackIcon />
    </button>
  </div>

  <div className="flex flex-col items-center justify-between xl:justify-around gap-x-10 md:items-start md:flex-row w-full">
    <div className="flex flex-col gap-y-5 md:w-2/6 max-w-[330px]">
      <picture className="mx-auto">
        <img
          className="aspect-[2000/3227] w-[220px] rounded-r-3xl"
          src={cover}
          alt={`Portada de ${title}`}
          // style={{ viewTransitionName: `book-${ISBN}` }}
        />
      </picture>
      <StatusBook status={status} ISBN={ISBN} />

      {status === BookStatus.NOT_READ ? (
        <button
          onClick={handleAddBook}
          className="justify-center text-black bg-white hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-3 inline-flex items-center mr-2 gap-x-3"
        >
          Agregar a biblioteca
        </button>
      ) : (
        <button
          onClick={handleDeleteBook}
          className="justify-center text-black bg-white hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold  rounded-lg text-sm px-5 py-3 inline-flex items-center mr-2 gap-x-3"
        >
          Quitar de biblioteca
        </button>
      )}
    </div>

    <aside className="space-y-5 flex flex-col pt-6 md:pt-0 max-w-[500px] xl:max-w-[600px] 2xl:max-w-[700px]">
      <h2 className="text-sm md:text-3xl flex items-center justify-between font-bold">
        {title}
        <span className="text-black flex bg-white text-xs text-center md:text-xl font-bold px-4 py-2 rounded">
          {genre}
        </span>
      </h2>

      <div className="flex text-amber-500">
        {renderRatingIcons(rating, "w-5 h-5 md:h-6 md:w-6")}
      </div>
      <p>
        <strong className="text-black text-xs md:text-base">
          Autor:
        </strong>{" "}
        <span className="font-semibold text-black text-xs md:text-base">
          {author.name}
        </span>
      </p>
      <p>
        <strong className="text-black text-xs md:text-base">Año:</strong>{" "}
        <span className="font-semibold text-black text-xs md:text-base">
          {year}
        </span>
      </p>
      <p>
        <strong className="text-black text-xs md:text-xl">
          Paginas:
        </strong>{" "}
        <span className="font-semibold text-black text-xs md:text-base">
          {pages}
        </span>
      </p>
      <p className="text-xs md:text-base">{synopsis}</p>
      {getUserAuth() === null ? (
        <div className="md:px-10">
          <RegistrarUsuario isOpen={false} />
        </div>
      ) : (
        <AddReview ISBN={ISBN} />
      )}
      <ListOfReviews ISBN={ISBN} />
    </aside>
  </div>
</main>
</Layout> */
}
