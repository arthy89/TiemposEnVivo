import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const EspecialCard = ({ especial }) => {
  const navigation = useNavigation();
  const route = useRoute();
  // console.log(especial);

  const handlePress = () => {};
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("EspecialFormScreen", { especialId: especial._id })
      }
      className="bg-zinc-200 rounded-lg p-3 shadow-sm shadow-zinc-300 mt-3 flex flex-row justify-between"
    >
      <View>
        <Text className="font-bold text-lg">{especial.nombre}</Text>
        <Text>Lugar: {especial.lugar}</Text>
        <Text>Distancia: {especial.distancia}</Text>
      </View>

      <TouchableOpacity onPress={handlePress} className="flex justify-center">
        <Ionicons name="caret-forward" size={20} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default EspecialCard;
