import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const EspCard = ({ especial }) => {
  const navigation = useNavigation();
  //   console.log(especial);
  return (
    <TouchableOpacity
      className="bg-zinc-200 rounded-lg p-3 shadow-sm shadow-zinc-300 mb-2 flex flex-row justify-between mx-4"
      onPress={() => {
        navigation.navigate("TiempoEspecialScreen", {
          especialId: especial._id,
        });
      }}
    >
      <View className="flex justify-center">
        <Text className="text-md font-bold">{especial.nombre}</Text>
      </View>

      <TouchableOpacity
        className="flex justify-center"
        onPress={() => {
          navigation.navigate("TiempoEspecialScreen", {
            especialId: especial._id,
          });
        }}
      >
        <Ionicons name="caret-forward" size={20} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default EspCard;
