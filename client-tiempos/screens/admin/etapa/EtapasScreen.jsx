import { useQuery } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { GET_EVENTO_M } from "../../../graphql/evento/evento";
import Layout from "../../../components/Layout";
import { Ionicons } from "@expo/vector-icons";
import EtapasList from "../../../components/admin/etapas/EtapasList";

const EtapaScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { data, loading, error } = useQuery(GET_EVENTO_M, {
    variables: {
      id: route.params.eventoId,
    },

    skip: !route.params.eventoId,
  });

  if (loading) return <Text className="text-white text-lg">Cargando</Text>;
  if (error) return <Text className="text-white">Error!</Text>;

  // console.log(route);
  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10">
        {data.evento.nombre}
      </Text>
      <Text className="font-bold text-2xl text-center">Etapas</Text>

      {/* Nuevo */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("EtapaFormScreen", {
            eventoId: route.params.eventoId,
          })
        }
        className="flex self-center items-center justify-center bg-green-600 rounded-md py-1 w-8/12 mt-2 mb-3"
      >
        <Text className="text-center font-bold text-lg text-white">
          Crear Etapa
        </Text>
      </TouchableOpacity>

      <EtapasList />
    </Layout>
  );
};

export default EtapaScreen;
