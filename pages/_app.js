import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../store/UserContext";

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
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
      <Toaster
        toastOptions={{
          style: { fontSize: "1.4rem" },
        }}
      />
    </>
  );
}

export default MyApp;
