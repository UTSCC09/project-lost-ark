import "@/styles/globals.scss";
import Layout from "@/components/Layout/Layout";
import Navbar from "@/components/Navbar/Navbar";
import GlobalContextProvider from "@/context/context";
import { AppProps } from "next/app";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const hasNavbar =
    router.route === "/portfolio" || router.route.startsWith("/crypto");

  return (
    <>
      <Head>
        <title>Coin Ark</title>
        <meta
          name="description"
          content="Coin Ark is a cryptocurrency trading simulator platform that allows users to practice trading with cryptocurrencies without using real money."
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <GlobalContextProvider>
        <Layout
          Navbar={
            <AnimatePresence>
              {hasNavbar ? <Navbar key={hasNavbar ? 0 : 1} /> : undefined}
            </AnimatePresence>
          }
        >
          <AnimatePresence exitBeforeEnter>
            <Component key={Component} {...pageProps} />
          </AnimatePresence>
        </Layout>
      </GlobalContextProvider>
    </>
  );
};

export default App;
