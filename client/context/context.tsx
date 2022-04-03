import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { AccountProvider } from "@/context/AccountContext";
import { ThemeProvider } from "@/context/ThemeContext";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `/api/graphql`,
});

const GlobalContextProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <NotificationsProvider
        position="bottom-left"
        style={{ marginBottom: 50 }}
      >
        <ModalsProvider>
          <ApolloProvider client={client}>
            <AccountProvider>{children}</AccountProvider>
          </ApolloProvider>
        </ModalsProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
};

export default GlobalContextProvider;
