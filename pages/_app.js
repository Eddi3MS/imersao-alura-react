import Head from "next/head";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "../styles/GlobalStyles";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Aluracord - Imersão React.Js</title>{" "}
        <meta
          name="description"
          content="Aluracord - Projeto criado durante a imersão react.js da alura."
        />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
      <Toaster
        toastOptions={{
          style: { fontSize: "1.4rem" },
        }}
      />
    </>
  );
}

export default MyApp;
