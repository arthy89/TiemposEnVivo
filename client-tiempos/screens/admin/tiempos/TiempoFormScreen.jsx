import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Layout from "../../../components/Layout";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TRIPS_EVENTO } from "../../../graphql/evento/tripulacion";
import { useEffect, useState } from "react";
import getUser from "../../../assets/getUser";
import { NEW_TIEMPO } from "../../../graphql/evento/tiempos";

const TiempoFormScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // console.log(route);

  const [userData, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // console.log(userData);

  const {
    data,
    loading: loadingTrips,
    error,
  } = useQuery(GET_TRIPS_EVENTO, {
    variables: {
      id: route.params.eventoId,
    },
  });
  // console.log(data.tripulacionesEvent);

  //* Tripulacion data
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  //? Tiempos de la tripulacion
  const [tiemposTrip, setTiemposTrip] = useState({
    especialId: "",
    tripulacion: "",
    horaSalida: "",
    horaLlegada: "",
    registrador: "",
    penalizacion: "",
  });

  const [tiempoForm, setTiempoForm] = useState({
    horasSalida: "",
    minutosSalida: "",
    segundosSalida: "",
    milisegundosSalida: "",
    horasLlegada: "",
    minutosLlegada: "",
    segundosLlegada: "",
    milisegundosLlegada: "",
    horasPena: "",
    minutosPena: "",
    segundosPena: "",
    milisegundosPena: "",
  });

  // para evitar bucles infinitos
  useEffect(() => {
    const obtenerUser = async () => {
      try {
        const userAuth = await getUser();
        setUser(userAuth);
      } catch (error) {
        console.log("Error al obtener el usuario: ", error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    obtenerUser();
  }, []);

  useEffect(() => {
    if (data) {
      setFilteredData(data.tripulacionesEvent);
    }
  }, [data]);

  const handleSearch = (text) => {
    setSearch(text);
    setFilteredData(
      data.tripulacionesEvent.filter((item) =>
        item.autoNum.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleSelectTripulacion = (item) => {
    setSelectedValue(item);
    setShowPicker(false);
    // console.log("Tripulacion select:", item);

    setTiemposTrip((prevState) => ({
      ...prevState,
      tripulacion: item._id,
    }));
  };

  const handleChange = (name, value) =>
    setTiempoForm({ ...tiempoForm, [name]: value });

  function tiempoToMs(horas, minutos, segundos, milisegundos) {
    const horasMs = horas * 60 * 60 * 1000;
    const minutosMs = minutos * 60 * 1000;
    const segundosMs = segundos * 1000;
    const milisegundosMs = parseInt(milisegundos);

    const tiempoTotalMs = horasMs + minutosMs + segundosMs + milisegundosMs;
    return tiempoTotalMs;
  }

  const [crearTiempo, { tloading, terror }] = useMutation(NEW_TIEMPO, {
    refetchQueries: ["getEspPro"],
  });

  const handleSubmit = () => {
    tiemposTrip.registrador = userData.nombre;
    tiemposTrip.especialId = route.params.especialId;

    tiemposTrip.horaSalida = tiempoToMs(
      tiempoForm.horasSalida,
      tiempoForm.minutosSalida,
      tiempoForm.segundosSalida,
      tiempoForm.milisegundosSalida
    );

    tiemposTrip.horaLlegada = tiempoToMs(
      tiempoForm.horasLlegada,
      tiempoForm.minutosLlegada,
      tiempoForm.segundosLlegada,
      tiempoForm.milisegundosLlegada
    );

    if (!tiemposTrip.penalizacion) {
      tiemposTrip.penalizacion = tiempoToMs(
        tiempoForm.horasPena,
        tiempoForm.minutosPena,
        tiempoForm.segundosPena,
        tiempoForm.milisegundosPena
      );
    }
    // console.log(tiemposTrip);

    crearTiempo({
      variables: {
        especialId: tiemposTrip.especialId,
        tripulacion: tiemposTrip.tripulacion,
        horaSalida: tiemposTrip.horaSalida,
        horaLlegada: tiemposTrip.horaLlegada,
        penalizacion: tiemposTrip.penalizacion,
        registrador: tiemposTrip.registrador,
      },
    });

    navigation.navigate("TiempoEspecialScreen", {
      especialId: route.params.especialId,
    });
  };

  if (isLoadingUser || loadingTrips)
    return <Text className="text-center text-lg mt-10">Cargando</Text>;

  if (error) return <Text className="text-center text-lg mt-10">Error!!</Text>;

  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10">
        Registrar Tiempo
      </Text>

      {/* TRIPULACION SELECT */}
      <Text className="mx-5 font-bold text-xl">Tripulación</Text>
      <View className="px-4">
        <TouchableOpacity
          className="flex flex-row items-center border border-gray-300 p-2 rounded-md"
          onPress={() => setShowPicker(!showPicker)}
        >
          <Text className="text-lg">
            {selectedValue ? `${selectedValue.autoNum}` : "Num Tripulación..."}
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <View className="border border-gray-300 mt-2 rounded-md">
            <TextInput
              className="h-10 border-b border-gray-300 px-2"
              placeholder="Buscar..."
              value={search}
              onChangeText={handleSearch}
            />
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item._id}
              nestedScrollEnabled={true}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-2 border-b border-gray-200"
                  onPress={() => handleSelectTripulacion(item)}
                >
                  <Text>{item.autoNum}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      {/* HORA DE SALIDA */}
      <Text className="mx-5 font-bold text-2xl mt-2">Hora de Salida</Text>
      <View className="flex flex-row justify-evenly">
        <View>
          <Text className="font-bold text-md text-center">Horas</Text>
          <TextInput
            className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md mb-2 w-14"
            style={{ lineHeight: 0 }}
            keyboardType="numeric"
            placeholder="00"
            placeholderTextColor="#a1a1aa"
            onChangeText={(text) => handleChange("horasSalida", text)}
          />
        </View>

        <View>
          <Text className="font-bold text-md text-center">Minutos</Text>
          <TextInput
            className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md mb-2 w-14"
            style={{ lineHeight: 0 }}
            keyboardType="numeric"
            placeholder="00"
            placeholderTextColor="#a1a1aa"
            onChangeText={(text) => handleChange("minutosSalida", text)}
          />
        </View>

        <View>
          <Text className="font-bold text-md text-center">Segundos</Text>
          <TextInput
            className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md mb-2 w-14"
            style={{ lineHeight: 0 }}
            keyboardType="numeric"
            placeholder="00"
            placeholderTextColor="#a1a1aa"
            onChangeText={(text) => handleChange("segundosSalida", text)}
          />
        </View>

        <View>
          <Text className="font-bold text-md text-center">Milisegs</Text>
          <TextInput
            className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md mb-2 w-14"
            style={{ lineHeight: 0 }}
            keyboardType="numeric"
            placeholder="00"
            placeholderTextColor="#a1a1aa"
            onChangeText={(text) => handleChange("milisegundosSalida", text)}
          />
        </View>
      </View>

      {/* HORA DE LLEGADA */}
      <Text className="mx-5 font-bold text-2xl mt-2">Hora de Llegada</Text>
      <View className="flex flex-row justify-evenly">
        <View>
          <Text className="font-bold text-md text-center">Horas</Text>
          <TextInput
            className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md mb-2 w-14"
            style={{ lineHeight: 0 }}
            keyboardType="numeric"
            placeholder="00"
            placeholderTextColor="#a1a1aa"
            onChangeText={(text) => handleChange("horasLlegada", text)}
          />
        </View>

        <View>
          <Text className="font-bold text-md text-center">Minutos</Text>
          <TextInput
            className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md mb-2 w-14"
            style={{ lineHeight: 0 }}
            keyboardType="numeric"
            placeholder="00"
            placeholderTextColor="#a1a1aa"
            onChangeText={(text) => handleChange("minutosLlegada", text)}
          />
        </View>

        <View>
          <Text className="font-bold text-md text-center">Segundos</Text>
          <TextInput
            className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md mb-2 w-14"
            style={{ lineHeight: 0 }}
            keyboardType="numeric"
            placeholder="00"
            placeholderTextColor="#a1a1aa"
            onChangeText={(text) => handleChange("segundosLlegada", text)}
          />
        </View>

        <View>
          <Text className="font-bold text-md text-center">Milisegs</Text>
          <TextInput
            className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md mb-2 w-14"
            style={{ lineHeight: 0 }}
            keyboardType="numeric"
            placeholder="00"
            placeholderTextColor="#a1a1aa"
            onChangeText={(text) => handleChange("milisegundosLlegada", text)}
          />
        </View>
      </View>

      {/* PENALIZACION */}
      <Text className="mx-5 font-bold text-2xl mt-2">Penalización</Text>
      <View className="flex flex-row justify-evenly">
        <View>
          <Text className="font-bold text-md text-center">Horas</Text>
          <TextInput
            className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md mb-2 w-14"
            style={{ lineHeight: 0 }}
            keyboardType="numeric"
            placeholder="00"
            placeholderTextColor="#a1a1aa"
            onChangeText={(text) => handleChange("horasPena", text)}
          />
        </View>

        <View>
          <Text className="font-bold text-md text-center">Minutos</Text>
          <TextInput
            className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md mb-2 w-14"
            style={{ lineHeight: 0 }}
            keyboardType="numeric"
            placeholder="00"
            placeholderTextColor="#a1a1aa"
            onChangeText={(text) => handleChange("minutosPena", text)}
          />
        </View>

        <View>
          <Text className="font-bold text-md text-center">Segundos</Text>
          <TextInput
            className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md mb-2 w-14"
            style={{ lineHeight: 0 }}
            keyboardType="numeric"
            placeholder="00"
            placeholderTextColor="#a1a1aa"
            onChangeText={(text) => handleChange("segundosPena", text)}
          />
        </View>

        <View>
          <Text className="font-bold text-md text-center">Milisegs</Text>
          <TextInput
            className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md mb-2 w-14"
            style={{ lineHeight: 0 }}
            keyboardType="numeric"
            placeholder="00"
            placeholderTextColor="#a1a1aa"
            onChangeText={(text) => handleChange("milisegundosPena", text)}
          />
        </View>
      </View>

      {/* Guardar */}
      <TouchableOpacity
        onPress={handleSubmit}
        // disabled={!cat.nombre || loading}
        className="flex self-center bg-green-600 rounded-md py-2 w-10/12 mb-2"
      >
        <Text className="text-center font-bold text-lg text-white">
          Guardar Tiempos
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};

export default TiempoFormScreen;
