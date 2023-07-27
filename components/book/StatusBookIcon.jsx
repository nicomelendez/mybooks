import { BookStatus } from "../../context/helpers/interfaces/types";
import { EnBibliotecaIcon, LeidoIcon, LeyendoIcon } from "../utils/Icons";

export default function StatusBookIcon({ status }) {
  return (
    <div className="absolute top-0  left-0 right-5 flex items-center justify-end pt-5">
      {status !== BookStatus.NOT_READ ? (
        <span
          className="bg-white text-black text-lg font-bold p-1 rounded-full"
          title={status}
        >
          {status === BookStatus.IN_LIBRARY ? (
            <EnBibliotecaIcon />
          ) : status === BookStatus.READING ? (
            <LeyendoIcon />
          ) : (
            <LeidoIcon />
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
