import { useQuery } from "@apollo/client";
import { useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { GET_EVENTOS_SIM } from "../../graphql/evento/evento";
import EventoAdminCard from "./EventoAdminCard";

const EventosAdminList = () => {
  const [refreshin, setRefreshing] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_EVENTOS_SIM);

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
      className="px-3 h-4/5"
      keyboardShouldPersistTaps="handled"
      data={data.eventos}
      keyExtractor={(evento) => evento._id}
      renderItem={({ item }) => <EventoAdminCard evento={item} />}
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

export default EventosAdminList;
