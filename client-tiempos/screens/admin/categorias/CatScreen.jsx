import { useRoute } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Layout from "../../../components/Layout";
import CatList from "../../../components/admin/categorias/CatList";
import { useQuery } from "@apollo/client";
import { GET_EVENTO_M } from "../../../graphql/evento/evento";
import CatForm from "../../../components/admin/categorias/CatForm";

const CatScreen = () => {
  const route = useRoute();

  const { data, loading, error } = useQuery(GET_EVENTO_M, {
    variables: {
      id: route.params.eventoId,
    },
    skip: !route.params.eventoId,
  });

  if (loading)
    return <Text className="text-center text-lg mt-10">Cargando</Text>;

  if (error) return <Text className="text-center text-lg mt-10">Error!!</Text>;

  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10">Categorías</Text>

      <CatForm />

      <CatList categorias={data.evento.categorias} />
    </Layout>
  );
};

export default CatScreen;
