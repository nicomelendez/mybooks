import { useRouter } from "next/router";
import Layout from "../layout/Layout";
import NoFound from "../components/utils/NoFound";
import ListOfReviews from "../components/review/ListOfReviews";
import AddReview from "../components/review/AddReview";
import RegistrarUsuario from "../components/auth/RegistrarUsuario";
import { BackIcon } from "../components/utils/Icons";
import StatusBook from "../components/book/StatusBook";
import { renderRatingIcons } from "../components/utils/renderRatingIcons";
import useLibrary from "../hooks/useLibrary";
import { BookStatus } from "../context/helpers/interfaces/types";
import { toastSucess } from "../context/helpers/toast/sucess";

export default function Book() {
  const { changeStatusBook, changeRoute, getUserAuth, searchBookForISBN } =
    useLibrary();

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

  return (
    <Layout title={`${title}`}>
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
    </Layout>
  );
}
