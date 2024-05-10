import {
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Layout from "../../../components/Layout";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  DEL_ESPECIAL,
  GET_ESPECIAL,
  NEW_ESPECIAL,
  UPT_ESPECIAL,
} from "../../../graphql/evento/especial";

const EspecialFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //   console.log(route);

  const [editing, setEditing] = useState(false);

  const [especial, setEspecial] = useState({
    nombre: "",
    lugar: "",
    distancia: "",
    // etapaId: "",
  });

  const [crearEspecial, { loading, error }] = useMutation(NEW_ESPECIAL, {
    refetchQueries: ["getEtapa"],
  });

  const [updateEspecial, { uploading, uperror }] = useMutation(UPT_ESPECIAL, {
    refetchQueries: ["getEtapa"],
  });

  const [delEspecial] = useMutation(DEL_ESPECIAL, {
    refetchQueries: ["getEtapa"],
  });

  const handleChange = (name, value) =>
    setEspecial({ ...especial, [name]: value });

  const handleSubmit = () => {
    if (editing) {
      updateEspecial({
        variables: {
          id: route.params.especialId,
          nombre: especial.nombre,
          lugar: especial.lugar,
          distancia: especial.distancia,
        },
      });

      navigation.navigate("EtapaScreen", {
        etapaId: fetchData.especial.etapa._id,
      });
    } else {
      especial.etapaId = route.params.etapaId;
      // console.log(especial);

      crearEspecial({
        variables: {
          nombre: especial.nombre,
          lugar: especial.lugar,
          distancia: especial.distancia,
          etapaId: especial.etapaId,
        },
      });

      navigation.navigate("EtapaScreen", {
        etapaId: route.params.etapaId,
      });
    }
  };

  const handleDelete = () => {
    delEspecial({
      variables: {
        id: route.params.especialId,
      },
    });

    navigation.navigate("EtapaScreen", {
      etapaId: fetchData.especial.etapa._id,
    });
  };

  const [
    fetchEspecial,
    { loading: fetchLoading, error: fetchError, data: fetchData },
  ] = useLazyQuery(GET_ESPECIAL, {
    variables: {
      id: route.params?.especialId,
    },
    skip: !route.params?.especialId,
  });

  // consultar al iniciar
  useEffect(() => {
    if (route.params && route.params.especialId) {
      fetchEspecial();
    }
  }, [route.params?.especialId, fetchEspecial]);

  // actualzar el valor de EDICION
  useEffect(() => {
    if (fetchData && fetchData.especial) {
      //   console.log("FETCH DATAAAAA:", fetchData);
      setEditing(true);
      setEspecial({
        nombre: fetchData.especial.nombre,
        lugar: fetchData.especial.lugar,
        distancia: fetchData.especial.distancia,
      });
    }
  }, [fetchData]);

  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10">
        {!editing ? "Nuevo Especial" : "Editando Especial"}
      </Text>

      <ScrollView className="h-screen">
        {/* Nombre */}
        <Text className="mx-5 font-bold text-xl">Nombre</Text>
        <TextInput
          className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
          //   style={{ lineHeight: 0 }}
          placeholder=""
          placeholderTextColor="#a1a1aa"
          onChangeText={(text) => handleChange("nombre", text)}
          value={especial.nombre}
        />

        {/* Lugar */}
        <Text className="mx-5 font-bold text-xl">Lugar</Text>
        <TextInput
          className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
          //   style={{ lineHeight: 0 }}
          placeholder=""
          placeholderTextColor="#a1a1aa"
          onChangeText={(text) => handleChange("lugar", text)}
          value={especial.lugar}
        />

        {/* Distancia */}
        <Text className="mx-5 font-bold text-xl">Distancia</Text>
        <TextInput
          className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
          //   style={{ lineHeight: 0 }}
          placeholder=""
          placeholderTextColor="#a1a1aa"
          onChangeText={(text) => handleChange("distancia", text)}
          value={especial.distancia}
        />

        {!editing ? (
          // NUEVO
          <TouchableOpacity
            onPress={handleSubmit}
            className="flex self-center bg-red-600 rounded-md py-2 w-10/12 mt-3"
          >
            <Text className="text-center font-bold text-lg text-white">
              Guardar
            </Text>
          </TouchableOpacity>
        ) : (
          // EDICION
          <View>
            {/* // Actualizar */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="flex self-center border border-green-600 rounded-md py-2 w-10/12 mt-3"
            >
              <Text className="text-center font-bold text-lg text-green-700">
                Actualizar
              </Text>
            </TouchableOpacity>

            {/* // Eliminar */}
            <TouchableOpacity
              onPress={handleDelete}
              className="flex self-center bg-red-600 rounded-md py-2 w-10/12 mt-2"
            >
              <Text className="text-center font-bold text-lg text-white">
                Eliminar
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
};

export default EspecialFormScreen;
