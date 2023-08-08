import { renderRatingIcons } from "../utils/renderRatingIcons";
import useLibrary from "@/hooks/useLibrary";
import { toastSucess } from "@/context/helpers/toast/sucess.js";
import StatusBookIcon from "@/components/book/StatusBookIcon";
import { BookStatus } from "@/context/helpers/interfaces/types";
import { EnBibliotecaIcon } from "../utils/Icons";

export default function Book({
  title,
  cover,
  genre,
  synopsis,
  ISBN,
  status,
  rating,
  author
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
    <article className="group border relative  mx-auto md:mx-0 md:w-auto block hover:bg-[#111517] rounded-r-3xl rounded-l-lg cursor-help">
      <div className="relative">
        <img
          alt={`Portada de ${title}`}
          src={cover}
          className=" rounded-l-lg w-full aspect-[2000/3227] transition-opacity group-hover:blur-xs group-hover:opacity-5 rounded-r-3xl"
        />

        <StatusBookIcon status={status} />
        <div className="absolute top-11 left-0 right-0 flex flex-col justify-end px-4 opacity-0 transition-all group-hover:opacity-100">
          <div className="space-y-2">
            <div className="flex justify-between items-center ">
              <span className=" text-2xs font-semibold  bg-gray-100 text-gray-800 px-[4px] py-[4px] rounded border border-gray-500">
                {genre}
              </span>
              <div className="flex py-2 text-amber-500">
                {renderRatingIcons(rating, "h-[9px] w-[9px]")}
              </div>
            </div>
            <h3 className="text-2xs text-white font-bold">{title}</h3>
            <p className="text-2xs font-medium text-white">{synopsis}</p>
            <span className="text-sky-300 text-2xs font-semibold rounded  pb-5">by {author.name}</span>
            <div className="flex text-xs items-center gap-x-4">
              <button
                onClick={() => {
                  changeRoute(`/book?ISBN=${ISBN}`);
                }}
                type="button"
                className="text-black cursor-pointer bg-white hover:shadow-lg hover:bg-slate-200/90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full  text-[8px] p-1.5 text-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[20px] h-[20px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>

              </button>
              {status === BookStatus.NOT_READ ? (
                <button
                  onClick={handleAddBook}
                  type="button"
                  className="text-black cursor-pointer bg-white hover:shadow-lg hover:bg-slate-200/90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full p-1.5 text-[8px] text-center"
                >
                  <EnBibliotecaIcon size={"w-[18px] h-[18px]"} />

                </button>
              ) : (
                <button
                  onClick={handleDeleteBook}
                  type="button"
                  className="text-black cursor-pointer bg-white hover:shadow-lg hover:bg-slate-200/90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full text-[8px] p-1.5 text-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
                  </svg>
                </button>
              )}

            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
