import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@apollo/client";
import { DEL_TRIPULACION } from "../../../graphql/evento/tripulacion";

const TripCard = ({ trip }) => {
  const [delTrip] = useMutation(DEL_TRIPULACION, {
    refetchQueries: ["getTripsEvent"],
  });

  return (
    <TouchableOpacity className="bg-zinc-200 rounded-lg p-2 shadow-sm shadow-zinc-300 mt-3 flex flex-row justify-between">
      <View className="flex justify-center">
        <Text className="text-md font-bold">
          <Text className="text-lg">{trip.autoNum} </Text>
          {trip.piloto.nombre} {trip.piloto.apellidos} - {trip.navegante.nombre}{" "}
          {trip.navegante.apellidos}
        </Text>
        <Text>
          {trip.categoria} - {trip.autoMarca} {trip.autoModelo}
        </Text>
      </View>

      <TouchableOpacity
        className="flex justify-center bg-red-600 rounded-md p-2"
        onPress={() => {
          delTrip({
            variables: {
              id: trip._id,
            },
          });
        }}
      >
        <Ionicons name="trash" size={20} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TripCard;
