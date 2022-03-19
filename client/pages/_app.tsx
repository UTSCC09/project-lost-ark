import "@/styles/globals.css";
import Layout from "@/components/Layout/Layout";
import { AppProps } from "next/app";
import Head from "next/head";
import GlobalContextProvider from "@/context/context";

const App = ({ Component, pageProps }: AppProps) => {
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalContextProvider>
    </>
  );
};

export default App;
