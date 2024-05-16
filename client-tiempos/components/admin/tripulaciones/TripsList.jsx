import { View, Text, FlatList } from "react-native";
import TripCard from "./TripCard";

const TripsList = ({ tripulaciones }) => {
  return (
    <View>
      <FlatList
        className="px-3 h-screen"
        keyboardShouldPersistTaps="handled"
        data={tripulaciones}
        keyExtractor={(trip) => trip._id}
        renderItem={({ item }) => <TripCard trip={item} />}
      />
    </View>
  );
};

export default TripsList;
