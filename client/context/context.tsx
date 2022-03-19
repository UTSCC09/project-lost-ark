import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import {
  ApolloProvider,
  ApolloClient,
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
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default GlobalContextProvider;
