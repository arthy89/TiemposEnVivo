import { AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Navigation from "./Navigation";

const client = new ApolloClient({
  uri: "http://192.168.1.50:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Navigation />
  </ApolloProvider>
);

AppRegistry.registerComponent("TiemposEnVivoApp", () => App);

export default App;
