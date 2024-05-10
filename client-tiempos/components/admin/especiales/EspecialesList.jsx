import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, FlatList } from "react-native";
import { GET_ETAPA } from "../../../graphql/evento/etapa";
import { useQuery } from "@apollo/client";
import EspecialCard from "./EspecialCard";

const EspecialesList = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { data, loading, error } = useQuery(GET_ETAPA, {
    variables: {
      id: route.params.etapaId,
    },

    skip: !route.params.etapaId,
  });

  // console.log(route);
  //   console.log(data);

  if (loading) return <Text className="text-white text-lg">Cargando</Text>;
  if (error) return <Text className="text-white">Error!</Text>;

  return (
    <View>
      <Text className="font-bold text-xl mx-3">Especiales</Text>
      <FlatList
        className="px-3"
        data={data.etapa.especiales}
        keyExtractor={(especial) => especial._id}
        renderItem={({ item }) => <EspecialCard especial={item} />}
      />
    </View>
  );
};

export default EspecialesList;
