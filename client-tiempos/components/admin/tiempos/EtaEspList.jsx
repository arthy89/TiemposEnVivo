import { View, Text, ScrollView } from "react-native";
import EtaEspCard from "./EtaEspCard";

const EtaEspList = ({ etapas }) => {
  //   console.log(etapas);
  return (
    <ScrollView>
      {etapas.map((etapa) => (
        <EtaEspCard key={etapa._id} etapa={etapa} />
      ))}
    </ScrollView>
  );
};

export default EtaEspList;
