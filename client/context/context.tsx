import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { AccountProvider } from "@/context/AccountContext";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `/api/graphql`,
});

const GlobalContextProvider: React.FC = ({ children }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "light" }}
    >
      <NotificationsProvider
        style={{ marginTop: "3rem" }}
        position="top-center"
      >
        <ModalsProvider>
          <ApolloProvider client={client}>
            <AccountProvider>{children}</AccountProvider>
          </ApolloProvider>
        </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default GlobalContextProvider;
