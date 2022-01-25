import { Toaster } from "react-hot-toast";
import GlobalStyles from "../styles/GlobalStyles";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
