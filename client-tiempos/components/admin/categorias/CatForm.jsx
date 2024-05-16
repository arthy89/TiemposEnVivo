import { useMutation } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { NEW_CAT } from "../../../graphql/evento/categoria";

const CatForm = () => {
  const route = useRoute();
  //   console.log("FORM RUTAAA", route);

  const [cat, setCat] = useState({
    nombre: "",
  });

  const [crearCat, { loading, error }] = useMutation(NEW_CAT, {
    refetchQueries: ["getEventoM"],
  });

  const handleChange = (name, value) => setCat({ ...cat, [name]: value });

  const handleSubmit = () => {
    cat.eventoId = route.params.eventoId;
    // console.log(cat);

    crearCat({
      variables: {
        nombre: cat.nombre,
        eventoId: cat.eventoId,
      },
    });

    this.TextInput.clear();
  };

  return (
    <View>
      <Text className="mx-5 font-bold text-xl">Nombre</Text>
      <TextInput
        className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
        style={{ lineHeight: 0 }}
        placeholder="Nueva categoría"
        placeholderTextColor="#a1a1aa"
        ref={(input) => {
          this.TextInput = input;
        }}
        onChangeText={(text) => handleChange("nombre", text)}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={!cat.nombre || loading}
        className="flex self-center border border-green-600 rounded-md py-2 w-10/12 mb-2"
      >
        <Text className="text-center font-bold text-lg text-green-600">
          Agregar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CatForm;
