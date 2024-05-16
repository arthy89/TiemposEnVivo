import { View, Text, TouchableOpacity } from "react-native";
import Layout from "../../components/Layout";
import { useNavigation, useRoute } from "@react-navigation/native";

const ScreenEvento = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const evento = route.params.evento;
  // console.log(evento);

  const formatDate = (dateString) => {
    const fecha = new Date(Number(dateString));
    const formattedDate = fecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };

  const formatTime = (timeString) => {
    const hora = new Date(Number(timeString));
    const formattedTime = hora.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedTime.split(",")[0]; //return solo la HORA
  };

  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10 ">
        {evento.nombre}
      </Text>

      <Text className="font-bold text-md mx-5 text-zinc-600">
        {evento.tipo} - {formatDate(evento.fecha)} - {formatTime(evento.hora)}
      </Text>

      <Text className="font-bold text-md mx-5 text-zinc-600">
        {evento.estado == null ? "Próximamente" : evento.estado}
      </Text>

      <Text className="mx-5 mt-3">{evento.descripcion}</Text>

      <TouchableOpacity
        onPress={() => {
          // !!!!!!!!sdfasdfasdfasdfas
          navigation.navigate("TiemposScreen");
        }}
        className="flex self-center bg-red-600 rounded-md py-2 w-8/12 mt-3"
      >
        <Text className="text-center font-bold text-lg text-white">
          Ver Tiempos
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};

export default ScreenEvento;
