import { SearchIcon } from "../utils/Icons";
import {
  AtributoBook,
  AtributoBookNames,
} from "@/context/helpers/interfaces/types";
import useLibrary from "@/hooks/useLibrary";
import Swal from "sweetalert2";

function Search() {
  const {
    getBooksFilter,
    changeFilteredBooks,
    resetFilteredBooks,
    getFueraDeBiblioteca,
    getLibrosGeneros,
    getChecked,
    changeChecked,
  }: any = useLibrary();

  const handleBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const { data, filtro } = Object.fromEntries(new window.FormData(form));

    if (filtro === "Filtro") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe seleccionar un filtro",
      });
      return;
    }

    const filteredBooks = getBooksFilter(data, filtro);

    if (filteredBooks == null || filteredBooks.books.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No hay resultados",
      });
      return;
    }

    changeFilteredBooks(filteredBooks);
  };

  function handleChangeFilter() {
    changeChecked(!getChecked());

    if (getChecked()) {
      resetFilteredBooks();
      return;
    }
    getFueraDeBiblioteca();
  }

  return (
    <section className="flex flex-col gap-y-8 lg:gap-y-0 lg:flex-row justify-between items-center ">
      <form
        onSubmit={handleBook}
        className="flex items-center flex-wrap justify-center flex-row gap-5"
      >
        {/* <div className="relative mx-auto md:mx-0">
          <input
            type="text"
            name="data"
            placeholder="Buscar..."
            className="w-full rounded-full border-gray-200 py-3 px-3 shadow-sm text-xs"
          />

          <span className="absolute top-3 end-1 grid w-10 place-content-center">
            <button type="submit" className="text-gray-600 hover:text-gray-700">
              <SearchIcon />
            </button>
          </span>
        </div> */}
        <div className="search">
          <div className="search-box">
            <div className="search-field">
              <input
                name="data"
                placeholder="Buscar..."
                className="input"
                type="text"
              />
              <div className="search-box-icon">
                <button type="submit" className="btn-icon-content">
                  <i className="search-icon">
                    <SearchIcon />
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <select
            name="filtro"
            id="filtro"
            className="p-[8px] w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm cursor-pointer"
          >
             <option className="cursor-pointer" defaultValue="true">
            Filtro
          </option>
            {Object.keys(AtributoBookNames).map((key) => (
              <option key={key} value={key}>
                 {AtributoBookNames[key as AtributoBook]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex text-xs flex-col items-center cursor-pointer">
          <p>{!getChecked() ? "Todos" : "Disponibles"}</p>
          <label
            htmlFor="AcceptConditions"
            className="relative h-4 w-12 cursor-pointer"
          >
            <input
              type="checkbox"
              id="AcceptConditions"
              className="peer sr-only"
              onClick={handleChangeFilter}
            />

            <span className="absolute inset-0 m-auto h-1 rounded-full bg-white"></span>

            <span className="absolute inset-y-0 start-0 m-auto h-4 w-4 rounded-full bg-blue-300 transition-all peer-checked:start-8 peer-checked:[&_>_*]:scale-0">
              <span className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-white transition"></span>
            </span>
          </label>
        </div>
      </form>
    </section>
  );
}

export default Search;
