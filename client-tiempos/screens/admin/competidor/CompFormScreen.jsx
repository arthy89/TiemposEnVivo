import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import Layout from "../../../components/Layout";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { NEW_COMPETIDOR } from "../../../graphql/evento/competidor";

const CompFormScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [competidor, setCompetidor] = useState({
    nombre: "",
    apellidos: "",
    fechaDeNac: "",
    tipoDeSangre: "",
  });

  const [fecha, setFecha] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (dateString) => {
    const _fecha = new Date(Number(dateString));
    const formattedDate = _fecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return formattedDate;
  };

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  // Fecha
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker();
        setFecha(formatDate(currentDate));
      }
    } else {
      toggleDatepicker();
    }
  };

  const confirmIOSDate = () => {
    setFecha(formatDate(date));
    toggleDatepicker();
  };

  const [crearCompetidor, { loading, error }] = useMutation(NEW_COMPETIDOR, {
    refetchQueries: ["getCompetidores"],
  });

  const handleChange = (name, value) =>
    setCompetidor({ ...competidor, [name]: value });

  const handleSubmit = () => {
    competidor.fechaDeNac = date;
    // console.log(competidor);

    crearCompetidor({
      variables: {
        nombre: competidor.nombre,
        apellidos: competidor.apellidos,
        fechaDeNac: competidor.fechaDeNac,
        tipoDeSangre: competidor.tipoDeSangre,
      },
    });

    navigation.navigate("TripFormScreen", { eventoId: route.params.eventoId });
  };

  return (
    <Layout>
      <ScrollView>
        <Text className="font-bold text-3xl text-center mt-10">
          Nuevo Competidor
        </Text>

        <Text className="mx-5 font-bold text-xl">Nombre</Text>
        <TextInput
          className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
          style={{ lineHeight: 0 }}
          placeholder="Nombre..."
          placeholderTextColor="#a1a1aa"
          onChangeText={(text) => handleChange("nombre", text)}
        />

        <Text className="mx-5 font-bold text-xl">Apellidos</Text>
        <TextInput
          className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
          style={{ lineHeight: 0 }}
          placeholder="Apellidos..."
          placeholderTextColor="#a1a1aa"
          onChangeText={(text) => handleChange("apellidos", text)}
        />

        {/* FECHA */}
        <Text className="mx-5 font-bold text-xl">
          Fecha de Nacimiento (Opcional)
        </Text>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
            style={styles.datePicker}
          />
        )}

        {/* SELECCIONAR FECHA EN IOS */}
        {showPicker && Platform.OS === "ios" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 10,
            }}
          >
            {/* CANCERLAR */}
            <TouchableOpacity
              onPress={toggleDatepicker}
              className="flex justify-center bg-zinc-200 rounded-full"
            >
              <Text className="px-3 py-2 text-red-400 font-bold">Cancelar</Text>
            </TouchableOpacity>

            {/* CONFIRMAR */}
            <TouchableOpacity
              onPress={confirmIOSDate}
              className="flex justify-center bg-blue-200 rounded-full"
            >
              <Text className="px-3 py-2 text-blue-600 font-bold">
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {!showPicker && (
          <Pressable onPress={toggleDatepicker}>
            <TextInput
              className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
              style={{ lineHeight: 22 }}
              placeholder="Fecha de nacimiento..."
              placeholderTextColor="#a1a1aa"
              value={fecha}
              onChangeText={setFecha}
              editable={false}
              onPressIn={toggleDatepicker}
            />
          </Pressable>
        )}
        {/* FECHA */}

        <Text className="mx-5 font-bold text-xl">
          Tipo de Sangre (Opcional)
        </Text>
        <TextInput
          className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
          style={{ lineHeight: 0 }}
          placeholder="Tipo de sangre..."
          placeholderTextColor="#a1a1aa"
          onChangeText={(text) => handleChange("tipoDeSangre", text)}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          // disabled={!cat.nombre || loading}
          className="flex self-center bg-green-600 rounded-md py-2 w-10/12 mb-2"
        >
          <Text className="text-center font-bold text-lg text-white">
            Guardar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    height: 120,
    marginTop: -10,
    marginBottom: 10,
  },
});

export default CompFormScreen;
