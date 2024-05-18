import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Layout from "../../../components/Layout";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { GET_ESP_P } from "../../../graphql/evento/especial";
import TiempoTabla from "../../../components/admin/tiempos/TiempoTabla";

const TiempoEspecialScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { data, loading, error } = useQuery(GET_ESP_P, {
    variables: {
      id: route.params.especialId,
    },
  });

  //   console.log(data);

  if (loading)
    return <Text className="text-center text-lg mt-10">Cargando</Text>;

  if (error) return <Text className="text-center text-lg mt-10">Error!!</Text>;

  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10">
        {data.especial.etapa.evento.nombre}
      </Text>
      {/* <Text className="font-bold text-xl text-center mb-1">Tiempos</Text> */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("TiempoFormScreen", {
            especialId: route.params.especialId,
            eventoId: data.especial.etapa.evento._id,
          })
        }
        className="flex self-center items-center justify-center bg-green-600 rounded-md py-1 w-8/12 mb-3"
      >
        <Text className="text-center font-bold text-lg text-white">
          Registrar Tiempo
        </Text>
      </TouchableOpacity>

      <ScrollView>
        {/* Tabla */}
        <TiempoTabla especial={data.especial} admin={true} />
      </ScrollView>
    </Layout>
  );
};

export default TiempoEspecialScreen;
