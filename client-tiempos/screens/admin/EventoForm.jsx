import Layout from "../../components/Layout";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
import getUser from "../../assets/getUser";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREAR_EVENTO } from "../../graphql/evento/evento";

const EventoForm = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const [userData, setUser] = useState(null);

  // para evitar bucles infinitos
  useEffect(() => {
    const obtenerUser = async () => {
      try {
        getUser().then((userAuth) => {
          setUser(userAuth);
        });
      } catch (error) {
        console.log("Error al obtener el usuario: ", error);
      }
    };

    obtenerUser();
  }, []);

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const [date, setDate] = useState(new Date());
  const [dateH, setDateH] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerHora, setShowPickerHora] = useState(false);

  const formatDate = (dateString) => {
    const _fecha = new Date(Number(dateString));
    const formattedDate = _fecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return formattedDate;
  };

  const formatHora = (horaString) => {
    const _hora = new Date(Number(horaString));
    const formattedTime = _hora.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return formattedTime;
  };

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const toggleTimepicker = () => {
    setShowPickerHora(!showPickerHora);
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

  // Hora
  const onChangeHora = ({ type }, selectedHora) => {
    if (type == "set") {
      const currentTime = selectedHora;
      setDateH(currentTime);

      if (Platform.OS === "android") {
        toggleTimepicker();
        setHora(formatHora(currentTime));
      }
    } else {
      toggleTimepicker();
    }
  };

  const confirmIOSDate = () => {
    setFecha(formatDate(date));
    toggleDatepicker();
  };

  const confirmIOSTime = () => {
    setHora(formatHora(dateH));
    toggleTimepicker();
  };

  //   EDICION
  const [editing, setEditing] = useState(false);

  const [evento, setEvento] = useState({
    nombre: "",
    tipo: "",
    descripcion: "",
    orgId: "",
    lugar: "",
    fecha: "",
    hora: "",
  });

  const [crearEvento, { loading, error }] = useMutation(CREAR_EVENTO, {
    refetchQueries: ["getEventosSim"],
  });

  const handleChange = (name, value) => setEvento({ ...evento, [name]: value });

  const handleSubmit = () => {
    evento.orgId = userData.org._id;
    evento.fecha = date;
    evento.hora = dateH;

    crearEvento({
      variables: {
        nombre: evento.nombre,
        tipo: evento.tipo,
        descripcion: evento.descripcion,
        orgId: evento.orgId,
        lugar: evento.lugar,
        fecha: evento.fecha,
        hora: evento.hora,
      },
    });

    navigation.navigate("AdminGeneral");
  };

  // !ASYNCSTORAGE al inicio siempre devuelve un Null, por lo que necesitamos dejarlo en espera un momento para que cargue bien los datos
  if (!userData) {
    return <Text className="text-center text-lg mt-10">Cargandoooooo!!</Text>;
  }

  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10">Nuevo Evento</Text>
      <ScrollView className="h-screen">
        <Text className="mx-5 font-bold text-xl">Nombre</Text>
        <TextInput
          className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
          style={{ lineHeight: 0 }}
          placeholder="Escriba el nombre del Evento"
          placeholderTextColor="#a1a1aa"
          onChangeText={(text) => handleChange("nombre", text)}
        />

        <Text className="mx-5 font-bold text-xl">Tipo</Text>
        <TextInput
          className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
          style={{ lineHeight: 0 }}
          placeholder="Tipo de evento (Rally, Autocross, etc)"
          placeholderTextColor="#a1a1aa"
          onChangeText={(text) => handleChange("tipo", text)}
        />

        <Text className="mx-5 font-bold text-xl">Descripción</Text>
        <TextInput
          className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
          multiline={true}
          style={{ lineHeight: 0 }}
          placeholder="Texto de descripción del Evento"
          placeholderTextColor="#a1a1aa"
          onChangeText={(text) => handleChange("descripcion", text)}
        />

        <Text className="mx-5 font-bold text-xl">Lugar</Text>
        <TextInput
          className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
          style={{ lineHeight: 0 }}
          placeholder="Ubicación donde se realizará el Evento"
          placeholderTextColor="#a1a1aa"
          onChangeText={(text) => handleChange("lugar", text)}
        />

        {/* FECHA */}
        <Text className="mx-5 font-bold text-xl">Fecha</Text>
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
            style={{ flexDirection: "row", justifyContent: "space-around" }}
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
              placeholder="Fecha del evento"
              placeholderTextColor="#a1a1aa"
              value={fecha}
              onChangeText={setFecha}
              editable={false}
              onPressIn={toggleDatepicker}
            />
          </Pressable>
        )}
        {/* FECHA */}

        {/* HORA */}
        <Text className="mx-5 font-bold text-xl">Hora</Text>
        {showPickerHora && (
          <DateTimePicker
            value={dateH}
            mode="time"
            display="spinner"
            onChange={onChangeHora}
            style={styles.datePicker}
          />
        )}

        {/* SELECCIONAR HORA EN IOS */}
        {showPickerHora && Platform.OS === "ios" && (
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            {/* CANCERLAR */}
            <TouchableOpacity
              onPress={toggleTimepicker}
              className="flex justify-center bg-zinc-200 rounded-full"
            >
              <Text className="px-3 py-2 text-red-400 font-bold">Cancelar</Text>
            </TouchableOpacity>

            {/* CONFIRMAR */}
            <TouchableOpacity
              onPress={confirmIOSTime}
              className="flex justify-center bg-blue-200 rounded-full"
            >
              <Text className="px-3 py-2 text-blue-600 font-bold">
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {!showPickerHora && (
          <Pressable onPress={toggleTimepicker}>
            <TextInput
              className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
              style={{ lineHeight: 22 }}
              placeholder="Hora del evento"
              placeholderTextColor="#a1a1aa"
              value={hora}
              onChangeText={setHora}
              editable={false}
              onPressIn={toggleTimepicker}
            />
          </Pressable>
        )}
        {/* HORA */}

        <TouchableOpacity
          onPress={handleSubmit}
          className="flex self-center bg-red-600 rounded-md py-2 w-10/12 mt-3 mb-20"
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

export default EventoForm;
