import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

const EtapaCard = ({ etapa }) => {
  const navigation = useNavigation();

  console.log(etapa);

  let especialesTotal = 0;
  etapa.especiales.forEach((especial) => {
    especialesTotal += 1;
  });

  const handlePress = () => {
    navigation.navigate("EtapaScreen", { etapaId: etapa._id });
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-zinc-200 rounded-lg p-3 shadow-sm shadow-zinc-300 mt-3 flex flex-row justify-between"
    >
      <View>
        <Text className="font-bold text-lg">{etapa.nombre}</Text>
        <Text>Especiales: {especialesTotal}</Text>
      </View>

      <TouchableOpacity onPress={handlePress} className="flex justify-center">
        <Ionicons name="caret-forward" size={20} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default EtapaCard;
