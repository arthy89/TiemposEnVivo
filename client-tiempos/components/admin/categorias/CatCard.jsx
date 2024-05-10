import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@apollo/client";
import { DEL_CAT } from "../../../graphql/evento/categoria";

const CatCard = ({ cat }) => {
  const [delCat] = useMutation(DEL_CAT, {
    refetchQueries: ["getEventoM"],
  });

  return (
    <View className="bg-zinc-200 rounded-lg p-2 shadow-sm shadow-zinc-300 mt-3 flex flex-row justify-between">
      <View className="flex justify-center">
        <Text className="text-lg">{cat.nombre}</Text>
      </View>

      <TouchableOpacity
        className="flex justify-center bg-red-600 rounded-md p-2"
        onPress={() => {
          delCat({
            variables: {
              id: cat._id,
            },
          });
        }}
      >
        <Ionicons name="trash" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CatCard;
