import { View, Text } from "react-native";
import Layout from "../components/Layout";
import { useQuery } from "@apollo/client";
import { GET_EVENTOS_SIM } from "../graphql/evento/evento";
import ListaEventos from "../components/client/ListaEventos";

const HomeScreen = () => {
  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10 ">
        Tiempos en Vivo
      </Text>

      <Text className="font-bold text-xl mx-3">Lista de Rally</Text>

      <ListaEventos />
    </Layout>
  );
};

export default HomeScreen;
