import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Layout from "../../../components/Layout";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "@apollo/client";
import { GET_EVENTO_M } from "../../../graphql/evento/evento";
import { GET_COMPETIDORES } from "../../../graphql/evento/competidor";
import { useState, useEffect } from "react";
import { NEW_TRIPULACION } from "../../../graphql/evento/tripulacion";

const TripFormScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // console.log(route);

  const {
    data: eData,
    loading: eLoading,
    error: eError,
  } = useQuery(GET_EVENTO_M, {
    variables: {
      id: route.params.eventoId,
    },
    skip: !route.params.eventoId,
  });

  // console.log(eData.evento.categorias);

  const {
    data: compData,
    loading: compLoading,
    error: compError,
  } = useQuery(GET_COMPETIDORES);
  // console.log(compData);

  //? TRIPULACION
  const [tripulacion, setTripulacion] = useState({
    piloto: "",
    navegante: "",
    eventoId: "",
    categoria: "",
    autoMarca: "",
    autoModelo: "",
    autoNum: "",
    equipoNombre: "",
  });

  const [crearTripulacion, { loading, error }] = useMutation(NEW_TRIPULACION, {
    refetchQueries: ["getTripsEvent"],
  });

  // Piloto
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  // Navegante
  const [searchNavegante, setSearchNavegante] = useState("");
  const [selectedValueNavegante, setSelectedValueNavegante] = useState(null);
  const [showPickerNavegante, setShowPickerNavegante] = useState(false);
  const [filteredDataNavegante, setFilteredDataNavegante] = useState([]);

  // Categorias
  const [searchCat, setSearchCat] = useState("");
  const [selectedValueCat, setSelectedValueCat] = useState(null);
  const [showPickerCat, setShowPickerCat] = useState(false);
  const [filteredDataCat, setFilteredDataCat] = useState([]);

  useEffect(() => {
    if (compData) {
      setFilteredData(compData.competidores);
      setFilteredDataNavegante(compData.competidores);
      setFilteredDataCat(eData.evento.categorias);
    }
  }, [compData]);

  if (compLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (compError) return <Text>Error: {compError.message}</Text>;

  if (eLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (eError) return <Text>Error: {eError.message}</Text>;

  const handleSearch = (text) => {
    setSearch(text);
    setFilteredData(
      compData.competidores.filter(
        (item) =>
          item.nombre.toLowerCase().includes(text.toLowerCase()) ||
          item.apellidos.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleSearchNavegante = (text) => {
    setSearchNavegante(text);
    setFilteredDataNavegante(
      compData.competidores.filter(
        (item) =>
          item.nombre.toLowerCase().includes(text.toLowerCase()) ||
          item.apellidos.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleSearchCat = (text) => {
    setSearchCat(text);
    setFilteredDataCat(
      eData.evento.categorias.filter((item) =>
        item.nombre.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleSelectPiloto = (item) => {
    setSelectedValue(item);
    setShowPicker(false);
    // console.log("Piloto seleccionado:", item);

    setTripulacion((prevState) => ({
      ...prevState,
      piloto: item._id,
    }));
  };

  const handleSelectNavegante = (item) => {
    setSelectedValueNavegante(item);
    setShowPickerNavegante(false);
    // console.log("Navegante seleccionado:", item);

    setTripulacion((prevState) => ({
      ...prevState,
      navegante: item._id,
    }));
  };

  const handleSelectCat = (item) => {
    setSelectedValueCat(item);
    setShowPickerCat(false);
    // console.log("Categoría seleccionada:", item);

    setTripulacion((prevState) => ({
      ...prevState,
      categoria: item.nombre,
    }));
  };

  // Cambiar datos
  const handleChange = (name, value) =>
    setTripulacion({ ...tripulacion, [name]: value });

  // Para enviar
  const handleSubmit = () => {
    tripulacion.eventoId = route.params.eventoId;
    // console.log(tripulacion);

    crearTripulacion({
      variables: {
        piloto: tripulacion.piloto,
        navegante: tripulacion.navegante,
        eventoId: tripulacion.eventoId,
        categoria: tripulacion.categoria,
        autoMarca: tripulacion.autoMarca,
        autoModelo: tripulacion.autoModelo,
        autoNum: tripulacion.autoNum,
        equipoNombre: tripulacion.equipoNombre,
      },
    });

    navigation.navigate("TripScreen", { eventoId: route.params.eventoId });
  };

  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10">
        Nueva Tripulación
      </Text>

      <ScrollView>
        {/* Piloto */}
        <View className="flex flex-row justify-between mt-2">
          <Text className="mx-5 font-bold text-xl">Piloto</Text>
          <TouchableOpacity
            className="flex self-center items-center justify-center bg-green-600 rounded-md py-1 px-3 mb-1 mx-4"
            onPress={() =>
              navigation.navigate("CompFormScreen", {
                eventoId: route.params.eventoId,
              })
            }
          >
            <Text className="text-center font-bold text-sm text-white">
              + Nuevo
            </Text>
          </TouchableOpacity>
        </View>

        <View className="px-4">
          <TouchableOpacity
            className="flex flex-row items-center border border-gray-300 p-2 rounded-md"
            onPress={() => setShowPicker(!showPicker)}
          >
            <Text className="text-md">
              {selectedValue
                ? `${selectedValue.nombre} ${selectedValue.apellidos}`
                : "Seleccione..."}
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
                    onPress={() => handleSelectPiloto(item)}
                  >
                    <Text>
                      {item.nombre} {item.apellidos}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>

        {/* Navegante */}
        <View className="flex flex-row justify-between mt-2">
          <Text className="mx-5 font-bold text-xl">Navegante</Text>
          <TouchableOpacity
            className="flex self-center items-center justify-center bg-green-600 rounded-md py-1 px-3 mb-1 mx-4"
            onPress={() =>
              navigation.navigate("CompFormScreen", {
                eventoId: route.params.eventoId,
              })
            }
          >
            <Text className="text-center font-bold text-sm text-white">
              + Nuevo
            </Text>
          </TouchableOpacity>
        </View>

        <View className="px-4">
          <TouchableOpacity
            className="flex flex-row items-center border border-gray-300 p-2 rounded-md"
            onPress={() => setShowPickerNavegante(!showPickerNavegante)}
          >
            <Text className="text-md">
              {selectedValueNavegante
                ? `${selectedValueNavegante.nombre} ${selectedValueNavegante.apellidos}`
                : "Seleccione..."}
            </Text>
          </TouchableOpacity>
          {showPickerNavegante && (
            <View className="border border-gray-300 mt-2 rounded-md">
              <TextInput
                className="h-10 border-b border-gray-300 px-2"
                placeholder="Buscar..."
                value={searchNavegante}
                onChangeText={handleSearchNavegante}
              />
              <FlatList
                data={filteredDataNavegante}
                keyExtractor={(item) => item._id}
                nestedScrollEnabled={true}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="p-2 border-b border-gray-200"
                    onPress={() => handleSelectNavegante(item)}
                  >
                    <Text>
                      {item.nombre} {item.apellidos}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>

        {/* Categorias */}
        <View className="flex flex-row justify-between mt-2">
          <Text className="mx-5 font-bold text-xl">Categoría</Text>
          <TouchableOpacity className="flex self-center items-center justify-center bg-green-600 rounded-md py-1 px-3 mb-1 mx-4">
            <Text className="text-center font-bold text-sm text-white">
              + Nueva
            </Text>
          </TouchableOpacity>
        </View>

        <View className="px-4">
          <TouchableOpacity
            className="flex flex-row items-center border border-gray-300 p-2 rounded-md"
            onPress={() => setShowPickerCat(!showPickerCat)}
          >
            <Text className="text-md">
              {selectedValueCat
                ? `${selectedValueCat.nombre}`
                : "Seleccione..."}
            </Text>
          </TouchableOpacity>
          {showPickerCat && (
            <View className="border border-gray-300 mt-2 rounded-md">
              <TextInput
                className="h-10 border-b border-gray-300 px-2"
                placeholder="Buscar..."
                value={searchCat}
                onChangeText={handleSearchCat}
              />
              <FlatList
                data={filteredDataCat}
                keyExtractor={(item) => item._id}
                nestedScrollEnabled={true}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="p-2 border-b border-gray-200"
                    onPress={() => handleSelectCat(item)}
                  >
                    <Text>{item.nombre}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>

        {/* Vehículo */}
        <Text className="mt-2 mx-5 font-bold text-2xl">Vehículo</Text>
        <Text className="mx-5 font-bold text-xl">Marca</Text>
        <TextInput
          className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
          style={{ lineHeight: 0 }}
          placeholder="Marca del vehículo..."
          placeholderTextColor="#a1a1aa"
          onChangeText={(text) => handleChange("autoMarca", text)}
        />

        <Text className="mx-5 font-bold text-xl">Modelo</Text>
        <TextInput
          className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
          style={{ lineHeight: 0 }}
          placeholder="Modelo del vehículo..."
          placeholderTextColor="#a1a1aa"
          onChangeText={(text) => handleChange("autoModelo", text)}
        />

        <Text className="mx-5 font-bold text-xl">Número</Text>
        <TextInput
          className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
          style={{ lineHeight: 0 }}
          placeholder="Num..."
          placeholderTextColor="#a1a1aa"
          onChangeText={(text) => handleChange("autoNum", text)}
        />

        <Text className="mx-5 font-bold text-xl">
          Nombre del Equipo (Opcional)
        </Text>
        <TextInput
          className="flex self-center items-center text-lg bg-zinc-200 py-3 px-4 rounded-md w-11/12 mb-2"
          style={{ lineHeight: 0 }}
          placeholder="Nombre..."
          placeholderTextColor="#a1a1aa"
          onChangeText={(text) => handleChange("equipoNombre", text)}
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

export default TripFormScreen;
