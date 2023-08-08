import LogoTipo from "@/components/utils/LogoTipo";
import useLibrary from "@/hooks/useLibrary";

export default function Nav() {
  const { changeRoute, getUserAuth, loginUser, resetFilteredBooks } =
    useLibrary();

  return (
    <header className="w-full sm:max-w-4xl lg:max-w-6xl xl:max-w-[1600px] mx-auto pt-10">
      <nav className="flex flex-col gap-y-10 md:gap-y-0 items-center justify-between md:flex-row">
        <button
          className="cursor-pointer flex justify-center"
          onClick={() => {
            resetFilteredBooks();
            changeRoute("/");
          }}
        >
          <LogoTipo />
        </button>

        <div className="flex flex-row text-sm justify-between gap-x-5">
          <div className="">
            <button onClick={() => {
              changeRoute("/misLibros");
            }} className="button_nav">
              <span>&nbsp;Biblioteca&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;Biblioteca&nbsp;</span>
            </button>
          </div>
          <div className="">
            {getUserAuth() === null
              ?
              (<button
                onClick={() => {
                  changeRoute("/login");
                }}
                className="button_nav">
                <span>&nbsp;Unirme&nbsp;</span>
                <span className="hover-text" aria-hidden="true">&nbsp;Unirme&nbsp;</span>
              </button>)
              :
              (<button
                onClick={() => {
                  changeRoute("/login");
                  loginUser(null)
                }}
                className="button_nav">
                <span>&nbsp;Salir&nbsp;</span>
                <span className="hover-text" aria-hidden="true">&nbsp;Salir&nbsp;</span>
              </button>)}

          </div>
        </div>
      </nav>
    </header>
  );
}
