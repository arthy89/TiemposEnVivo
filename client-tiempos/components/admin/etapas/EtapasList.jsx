import { Text, FlatList, View } from "react-native";
import EtapaCard from "./EtapaCard";
import { useQuery } from "@apollo/client";
import { GET_EVENTO_M } from "../../../graphql/evento/evento";
import { useRoute } from "@react-navigation/native";

const EtapasList = () => {
  const route = useRoute();
  const { data, loading, error } = useQuery(GET_EVENTO_M, {
    variables: {
      id: route.params.eventoId,
    },

    skip: !route.params.eventoId,
  });

  // console.log(route);
  // console.log(data);

  if (loading)
    return <Text className="text-center text-lg mt-10">Cargando</Text>;

  if (error) return <Text className="text-center text-lg mt-10">Error!!</Text>;

  return (
    <View>
      <Text className="font-bold text-xl mx-3">Etapas</Text>
      <FlatList
        className="px-3 h-4/5"
        keyboardShouldPersistTaps="handled"
        data={data.evento.etapas}
        keyExtractor={(evento) => evento._id}
        renderItem={({ item }) => <EtapaCard etapa={item} />}
      />
    </View>
  );
};

export default EtapasList;
