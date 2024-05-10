import { useQuery } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { GET_EVENTO_M } from "../../../graphql/evento/evento";
import Layout from "../../../components/Layout";
import { Ionicons } from "@expo/vector-icons";

const EventoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { data, loading, error } = useQuery(GET_EVENTO_M, {
    variables: {
      id: route.params.eventoId,
    },

    skip: !route.params.eventoId,
  });

  if (loading) return <Text className="text-white text-lg">Cargando</Text>;
  if (error) return <Text className="text-white">Error!</Text>;

  console.log(data);

  let especialesTotal = 0;
  data.evento.etapas.forEach((etapa) => {
    especialesTotal += etapa.especiales.length;
  });

  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10">
        {data.evento.nombre}
      </Text>
      <Text className="text-base text-center">{data.evento.estado}</Text>

      {/* ETAPAS */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EtapasScreen", { eventoId: data.evento._id });
        }}
        className="bg-zinc-200 rounded-md p-3 mx-3 shadow-sm shadow-zinc-300 mt-3 flex flex-row justify-between"
      >
        <View>
          <Text className="font-bold text-lg">
            Etapas: {data.evento.etapas.length}
          </Text>
          <Text className="text-md">Especiales: {especialesTotal}</Text>
        </View>

        <TouchableOpacity className="flex justify-center">
          <Ionicons name="caret-forward" size={20} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* CATEGORIAS */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CatScreen", { eventoId: data.evento._id });
          // console.log(data.evento);
        }}
        className="bg-zinc-200 rounded-md p-3 mx-3 shadow-sm shadow-zinc-300 mt-3 flex flex-row justify-between"
      >
        <View>
          <Text className="font-bold text-lg">
            Categorías: {data.evento.categorias.length}
          </Text>
        </View>

        <TouchableOpacity className="flex justify-center">
          <Ionicons name="caret-forward" size={20} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* TRIPULACIONES */}
      <TouchableOpacity className="bg-zinc-200 rounded-md p-3 mx-3 shadow-sm shadow-zinc-300 mt-3 flex flex-row justify-between">
        <View>
          <Text className="font-bold text-lg">
            Tripulaciones: {data.evento.tripulaciones.length}
          </Text>
        </View>

        <TouchableOpacity className="flex justify-center">
          <Ionicons name="caret-forward" size={20} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* TIEMPOS */}
      <TouchableOpacity className="bg-slate-200 rounded-md p-3 mx-3 shadow-sm shadow-zinc-300 mt-3 flex flex-row justify-between">
        <View>
          <Text className="font-bold text-lg">Tiempos</Text>
        </View>

        <TouchableOpacity className="flex justify-center">
          <Ionicons name="caret-forward" size={20} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* EDITAR */}
      <TouchableOpacity className="rounded-lg p-3 m-3 mt-10 border border-slate-700">
        <Text className="font-bold text-center text-xl">Editar Evento</Text>
      </TouchableOpacity>

      {/* ELIMINAR */}
      <TouchableOpacity className="bg-red-500 rounded-lg p-3 mx-3">
        <Text className="font-bold text-center text-xl text-white">
          Eliminar Evento
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};

export default EventoScreen;
