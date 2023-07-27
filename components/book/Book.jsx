import { renderRatingIcons } from "../utils/renderRatingIcons";
import useLibrary from "@/hooks/useLibrary";
import { toastSucess } from "@/context/helpers/toast/sucess.js";
import StatusBookIcon from "@/components/book/StatusBookIcon";
import { BookStatus } from "@/context/helpers/interfaces/types";

export default function Book({
  title,
  cover,
  genre,
  synopsis,
  ISBN,
  status,
  rating,
}) {
  const { changeStatusBook, changeRoute } = useLibrary();

  const handleAddBook = () => {
    toastSucess("✅ Libro agregado!");
    changeStatusBook(BookStatus.IN_LIBRARY, ISBN);
  };

  const handleDeleteBook = () => {
    toastSucess("✅ Libro quitado!");
    changeStatusBook(BookStatus.NOT_READ, ISBN);
  };

  return (
    <article className="group relative w-[240px] block hover:bg-black md:w-full rounded-r-3xl rounded-l-lg cursor-help">
      <div className="relative">
        <img
          alt={`Portada de ${title}`}
          src={cover}
          className="w-full rounded-l-lg aspect-[2000/3227] transition-opacity group-hover:blur-sm group-hover:opacity-20 rounded-r-3xl"
        />
        <StatusBookIcon status={status} />
        <div className="absolute top-20  left-0 right-0 flex flex-col justify-end px-5 opacity-0 transition-all group-hover:opacity-100">
          <div className="flex pb-4 justify-between items-center">
            <span className="bg-white text-black text-xs font-bold mr-2 px-3 py-1 rounded">
              {genre}
            </span>
            <div className="flex py-2 text-amber-500">
              {renderRatingIcons(rating, "h-4 w-4")}
            </div>
          </div>
          <h3 className="text-sm text-white font-bold">{title}</h3>
          <p className="text-sm text-white">{synopsis}</p>
          <div className="flex justify-between text-xs pt-8 sm:pt-10 items-center">
            {status === BookStatus.NOT_READ ? (
              <button
                onClick={handleAddBook}
                type="button"
                className="text-black cursor-pointer bg-white hover:shadow-lg hover:bg-slate-200/90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full px-4 py-2 text-xs  text-center"
              >
                Agregar
              </button>
            ) : (
              <button
                onClick={handleDeleteBook}
                type="button"
                className="text-black cursor-pointer bg-white hover:shadow-lg hover:bg-slate-200/90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full text-xs px-4 py-2  text-center"
              >
                Quitar
              </button>
            )}
            <button
              onClick={() => {
                changeRoute(`/book?ISBN=${ISBN}`);
              }}
              type="button"
              className="text-black cursor-pointer bg-white hover:shadow-lg hover:bg-slate-200/90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full px-4 py-2 text-xs  text-center"
            >
              Ver más
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
