import "@/styles/globals.css";
import Layout from "@/components/Layout/Layout";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import CONFIG from "@/config/config";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${CONFIG.BACKEND_URL}/graphql`,
});

// TODO: Example GraphQL query
// client.query({
//   query: gql`
//     query UserQuery {
//       user {
//         username
//       }
//     }
//   `
// }).then((res) => console.log(res.data.user.username)).catch((err) => console.error(err))

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
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light" }}
      >
        <NotificationsProvider
          style={{ marginTop: "3rem" }}
          position="top-center"
        >
          <ApolloProvider client={client}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ApolloProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
};

export default App;
