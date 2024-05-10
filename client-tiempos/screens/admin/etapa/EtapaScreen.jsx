import { useMutation, useQuery } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import Layout from "../../../components/Layout";
import { DEL_ETAPA, GET_ETAPA } from "../../../graphql/evento/etapa";
import EspecialesList from "../../../components/admin/especiales/EspecialesList";
import React from "react";

const EtapaScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { data, loading, error } = useQuery(GET_ETAPA, {
    variables: {
      id: route.params.etapaId,
    },

    skip: !route.params.etapaId,
  });

  const [deleteEtapa] = useMutation(DEL_ETAPA, {
    refetchQueries: ["getEventoM"],
  });

  const handleDelete = () => {
    deleteEtapa({
      variables: {
        id: data.etapa._id,
      },
    });

    navigation.navigate("EtapasScreen", { eventoId: data.etapa.evento._id });
  };

  // console.log("rutaaaaaaa", route);
  console.log(data);
  // !!! FALTAN LOS BOTONES DE BORRAR Y EDITAR

  if (loading) return <Text className="text-white text-lg">Cargando</Text>;
  if (error) return <Text className="text-white">Error!</Text>;

  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10">
        {data.etapa.evento.nombre}
      </Text>
      <Text className="font-bold text-2xl text-center">
        {data.etapa.nombre}
      </Text>

      {/* Nuevo Especial */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("EspecialFormScreen", { etapaId: data.etapa._id })
        }
        className="flex self-center items-center justify-center bg-green-600 rounded-md py-1 w-8/12 mt-2 mb-3"
      >
        <Text className="text-center font-bold text-lg text-white">
          Nuevo Especial
        </Text>
      </TouchableOpacity>

      <EspecialesList />

      {/* Editar Etapa */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("EtapaFormScreen", { etapaId: data.etapa._id })
        }
        className="rounded-lg p-3 mx-3 mt-5 border border-slate-500"
      >
        <Text className="font-bold text-center text-xl text-slate-700">
          Editar Etapa
        </Text>
      </TouchableOpacity>

      {/* Eliminar Etapa */}
      <TouchableOpacity className="bg-red-500 rounded-lg p-3 mx-3 mt-2">
        <Text
          onPress={() => handleDelete()}
          className="font-bold text-center text-xl text-white"
        >
          Eliminar Etapa
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};

export default EtapaScreen;
