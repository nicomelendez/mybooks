import Layout from "@/layout/Layout";
import ListOfBooks from "@/components/book/ListOfBooks";
import Search from "@/components/search/Search";
import useLibrary from "@/hooks/useLibrary";
import { AtributoBook } from "@/context/helpers/interfaces/types";
import { useState } from "react";

export default function Home() {
    const { getfilteredBooks, getLibrosGeneros, getBookForPages, getBookForGerne, resetFilteredBooks } = useLibrary();
    const [filter, setFilter] = useState(0)

    function handleReset() {
        resetFilteredBooks();
        setFilter(0)
    }

    function handleChangeFilter(value, key) {
        if (typeof key === 'number') {
            setFilter(key)
            getBookForPages(value)
            return;
        }
        getBookForGerne(value, key)
        setFilter(value)
    }

    return (
        <Layout title="Inicio">
            <section className="flex flex-col items-center md:flex-row md:items-start space-y-5 justify-between md:space-y-0 pt-10 animate-fade-down animate-once animate-duration-300 animate-fade">
                <div className="flex flex-col w-full md:w-auto md:min-w-[200px] space-y-3">
                    <div className="flex gap-x-3 justify-center md:justify-start">
                        <h2 className="font-semibold">Filtros</h2>
                        <button className="hover:scale-110" onClick={handleReset}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        </button>
                    </div>
                    <div className="flex flex-row justify-around  md:justify-start md:flex-col gap-y-5">
                        <div>
                            <p className="text-sm font-bold pb-3">Por páginas</p>
                            <ul className="grid grid-cols-2 text-xs gap-4  md:ml-4 md:gap-3">
                                <li className={`${filter === 1 ? "underline" : ""} cursor-pointer hover:underline`} onClick={() => handleChangeFilter(0, 1)}>+ 0</li>
                                <li className={`${filter === 2 ? "underline" : ""} cursor-pointer hover:underline`} onClick={() => handleChangeFilter(200, 2)}>+ 200</li>
                                <li className={`${filter === 3 ? "underline" : ""} cursor-pointer hover:underline`} onClick={() => handleChangeFilter(400, 3)}>+ 400</li>
                                <li className={`${filter === 4 ? "underline" : ""} cursor-pointer hover:underline`} onClick={() => handleChangeFilter(600, 4)}>+ 600</li>
                                <li className={`${filter === 5 ? "underline" : ""} cursor-pointer hover:underline`} onClick={() => handleChangeFilter(800, 5)}>+ 800</li>
                                <li className={`${filter === 6 ? "underline" : ""} cursor-pointer hover:underline`} onClick={() => handleChangeFilter(1000, 6)}>+1 000</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-sm font-bold pb-3">Por género</p>
                            <ul className="grid text-xs gap-y-4 md:ml-4 md:gap-3">
                                <li className={`${filter === "Fantasía" ? "underline" : ""} cursor-pointer hover:underline`} onClick={() => handleChangeFilter("Fantasía", AtributoBook.GENRE)}>- Fantasía</li>
                                <li className={`${filter === "Ciencia ficción" ? "underline" : ""} cursor-pointer hover:underline`} onClick={() => handleChangeFilter("Ciencia ficción", AtributoBook.GENRE)}>- Ciencia ficción</li>
                                <li className={`${filter === "Zombies" ? "underline" : ""} cursor-pointer hover:underline`} onClick={() => handleChangeFilter("Zombies", AtributoBook.GENRE)}>- Zombies</li>
                                <li className={`${filter === "Terror" ? "underline" : ""} cursor-pointer hover:underline`} onClick={() => handleChangeFilter("Terror", AtributoBook.GENRE)}>- Terror</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full p lg:w-4/5 gap-y-5 overflow-hidden">
                    <div className="flex flex-col lg:flex-row justify-between pb-2 lg:pb-0">
                        <div className="text-center pb-5 lg:pb-0 lg:text-left">
                            <h3 className="text-black font-semibold text-base">
                                Cada libro cuenta una historia única
                            </h3>
                            <p className="text-xs text-gray-500">
                                {getLibrosGeneros()}
                            </p>
                        </div>
                        <Search />
                    </div>
                    <ListOfBooks books={getfilteredBooks()?.books} />
                </div>
            </section>
        </Layout>
    )
}
