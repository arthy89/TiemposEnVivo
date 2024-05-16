import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Layout from "../../../components/Layout";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ETAPA, NEW_ETAPA, UPD_ETAPA } from "../../../graphql/evento/etapa";

const EtapaFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // console.log(route);
  const [editing, setEditing] = useState(false);

  const [etapa, setEtapa] = useState({
    nombre: "",
  });

  const [crearEtapa, { loading, error }] = useMutation(NEW_ETAPA, {
    refetchQueries: ["getEventoM"],
  });

  const [updateEtapa, { uploading, uperror }] = useMutation(UPD_ETAPA, {
    refetchQueries: ["getEventoM"],
  });

  const handleChange = (name, value) => setEtapa({ ...etapa, [name]: value });

  const handleSubmit = () => {
    if (editing) {
      updateEtapa({
        variables: {
          id: route.params.etapaId,
          nombre: etapa.nombre,
        },
      });

      navigation.navigate("EtapasScreen", {
        eventoId: fetchData.etapa.evento._id,
      });
    } else {
      etapa.eventoId = route.params.eventoId;

      crearEtapa({
        variables: {
          nombre: etapa.nombre,
          eventoId: etapa.eventoId,
        },
      });

      navigation.navigate("EtapasScreen", { eventoId: route.params.eventoId });
    }
  };

  const [
    fetchEtapa,
    { loading: fetchLoading, error: fetchError, data: fetchData },
  ] = useLazyQuery(GET_ETAPA, {
    variables: {
      id: route.params?.etapaId,
    },
    skip: !route.params?.etapaId,
  });

  useEffect(() => {
    if (route.params && route.params.etapaId) {
      fetchEtapa();
    }
  }, [route.params?.etapaId, fetchEtapa]);

  useEffect(() => {
    if (fetchData && fetchData.etapa) {
      setEditing(true);
      setEtapa({
        nombre: fetchData.etapa.nombre,
      });
    }
  }, [fetchData]);

  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10">
        {!editing ? "Nueva Etapa" : "Editando Etapa"}
      </Text>

      <Text className="mx-5 font-bold text-xl">Nombre</Text>
      <TextInput
        className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
        // style={{ lineHeight: 0 }}
        placeholder=""
        placeholderTextColor="#a1a1aa"
        onChangeText={(text) => handleChange("nombre", text)}
        value={etapa.nombre}
      />

      {!editing ? (
        // NUEVO
        <TouchableOpacity
          onPress={handleSubmit}
          className="flex self-center bg-red-600 rounded-md py-2 w-10/12 mt-3 mb-20"
        >
          <Text className="text-center font-bold text-lg text-white">
            Guardar
          </Text>
        </TouchableOpacity>
      ) : (
        // EDICION
        <TouchableOpacity
          onPress={handleSubmit}
          className="flex self-center bg-blue-600 rounded-md py-2 w-10/12 mt-3 mb-20"
        >
          <Text className="text-center font-bold text-lg text-white">
            Actualizar
          </Text>
        </TouchableOpacity>
      )}
    </Layout>
  );
};

export default EtapaFormScreen;
