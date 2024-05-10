import moment from "moment";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const EventoAdminCard = ({ evento }) => {
  const navigation = useNavigation();

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

  const handlePress = () => {
    // console.log(`ID Evento: ${evento._id}`);
    navigation.navigate("EventoScreen", { eventoId: evento._id });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-zinc-200 rounded-lg p-3 shadow-sm shadow-zinc-300 mt-3 flex flex-row justify-between"
    >
      <View>
        <Text className="font-bold text-lg">{evento.nombre}</Text>
        <Text className="text-zinc-500">
          {formatDate(evento.fecha)} - {formatTime(evento.hora)}
          {" · "}
          {evento.estado == null ? "Próximamente" : evento.estado}
        </Text>
      </View>

      <TouchableOpacity onPress={handlePress} className="flex justify-center">
        <Ionicons name="caret-forward" size={20} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default EventoAdminCard;
