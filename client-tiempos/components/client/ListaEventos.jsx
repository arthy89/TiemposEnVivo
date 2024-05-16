import { View, Text, FlatList, RefreshControl } from "react-native";
import CardEvento from "./CardEvento";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENTOS_C } from "../../graphql/evento/evento";

const ListaEventos = () => {
  const { data, loading, error, refetch } = useQuery(GET_EVENTOS_C);

  const [refreshin, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading)
    return <Text className="text-center text-lg mt-10">Cargando</Text>;

  if (error) return <Text className="text-center text-lg mt-10">Error!!</Text>;

  return (
    <FlatList
      className="px-3 h-screen"
      keyboardShouldPersistTaps="handled"
      data={data.eventos}
      keyExtractor={(evento) => evento._id}
      renderItem={({ item }) => <CardEvento evento={item} />}
      refreshControl={
        <RefreshControl
          refreshing={refreshin}
          onRefresh={handleRefresh}
          colors={["#78e08f"]}
        />
      }
    />
  );
};

export default ListaEventos;
