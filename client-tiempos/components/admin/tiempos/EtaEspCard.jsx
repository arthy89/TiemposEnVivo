import { View, Text } from "react-native";
import EspCard from "./EspCard";

const EtaEspCard = ({ etapa }) => {
  return (
    <View>
      <Text className="font-bold text-xl mx-5">{etapa.nombre}</Text>
      {etapa.especiales.map((especial) => (
        <EspCard key={especial._id} especial={especial} />
      ))}
    </View>
  );
};

export default EtaEspCard;
