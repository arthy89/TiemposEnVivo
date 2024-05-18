import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";
import Layout from "../../../components/Layout";
import EtaEspList from "../../../components/admin/tiempos/EtaEspList";

const AdminTiempoScreen = () => {
  const route = useRoute();
  const evento = route.params.evento;
  //   console.log(route);
  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10">
        {evento.nombre}
      </Text>
      <Text className="font-bold text-xl text-center">Tiempos</Text>

      <EtaEspList etapas={evento.etapas} />
    </Layout>
  );
};

export default AdminTiempoScreen;
