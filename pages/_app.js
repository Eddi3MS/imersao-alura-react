import Head from "next/head";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "../styles/GlobalStyles";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState("");

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
      <Component {...pageProps} user={user} setUser={setUser} />
      <Toaster
        toastOptions={{
          style: { fontSize: "1.4rem" },
        }}
      />
    </>
  );
}

export default MyApp;
