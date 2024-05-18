import { useQuery } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { GET_TRIPS_EVENTO } from "../../../graphql/evento/tripulacion";
import Layout from "../../../components/Layout";
import TripsList from "../../../components/admin/tripulaciones/TripsList";

const TripScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // console.log(route);

  const { data, loading, error } = useQuery(GET_TRIPS_EVENTO, {
    variables: {
      id: route.params.eventoId,
    },

    skip: !route.params.eventoId,
  });

  //   console.log(data.tripulacionesEvent);
  //   console.log(route.params.eventoId);

  if (loading)
    return <Text className="text-center text-lg mt-10">Cargando</Text>;

  if (error) return <Text className="text-center text-lg mt-10">Error!!</Text>;

  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10">
        Tripulaciones
      </Text>

      {/* Nueva Tripulación */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("TripFormScreen", {
            eventoId: route.params.eventoId,
          })
        }
        className="flex self-center items-center justify-center bg-green-600 rounded-md py-1 w-8/12 mt-2 mb-3"
      >
        <Text className="text-center font-bold text-lg text-white">
          Nueva Tripulación
        </Text>
      </TouchableOpacity>

      <TripsList tripulaciones={data.tripulacionesEvent} />
    </Layout>
  );
};

export default TripScreen;
