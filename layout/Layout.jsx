import Head from "next/head";
import Nav from "@/components/layout/nav/Nav";
import Footer from "@/components/layout/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>MyBooks - {title}</title>
        <meta name="description" content="Prueba tecnica" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="px-5 md:px-20 xl:px-30 2xl:px-40 max-w-[1600px] mx-auto">
        <Nav />
        <main className="max-w-[1600px]">{children}</main>
        <Footer />
      </div>
      <ToastContainer className="text-xl" />
    </>
  );
}
