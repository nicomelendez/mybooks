import { BookStatus } from "../../context/helpers/interfaces/types";
import { EnBibliotecaIcon, LeidoIcon, LeyendoIcon } from "../utils/Icons";

export default function StatusBookIcon({ status }) {
  return (
    <div className="absolute top-0  left-0 right-3 flex items-center justify-end py-3 ">
      {status !== BookStatus.NOT_READ ? (
        <span
          className="bg-[#111517] bg-opacity-40 text-white font-black p-2 rounded-full"
          title={status}
        >
          {status === BookStatus.IN_LIBRARY ? (
            <EnBibliotecaIcon size={"w-5 h-5"}/>
          ) : status === BookStatus.READING ? (
            <LeyendoIcon size={"w-5 h-5"}/>
          ) : (
            <LeidoIcon size={"w-5 h-5"}/>
          )}
        </span>
      ) : status === BookStatus.NOT_READ ? (
        <span className="text-black text-lg font-bold p-1 h-6 w-6 rounded-full"></span>
      ) : (
        <></>
      )}
    </div>
  );
}
