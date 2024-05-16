import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

const CardEvento = ({ evento }) => {
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

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ScreenEvento", { evento: evento });
      }}
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
    </TouchableOpacity>
  );
};

export default CardEvento;
