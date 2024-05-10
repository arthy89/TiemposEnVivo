import { View, Text, ScrollView, FlatList } from "react-native";
import CatCard from "./CatCard";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { GET_EVENTO_M } from "../../../graphql/evento/evento";

const CatList = ({ categorias }) => {
  return (
    <View>
      <FlatList
        className="px-3 h-screen"
        keyboardShouldPersistTaps="handled"
        data={categorias}
        keyExtractor={(cat) => cat._id}
        renderItem={({ item }) => <CatCard cat={item} />}
      />
    </View>
  );
};

export default CatList;
