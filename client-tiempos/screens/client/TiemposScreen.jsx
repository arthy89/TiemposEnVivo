import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Layout from "../../components/Layout";
import { useRoute } from "@react-navigation/native";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_EVENTO_TIEMPOS } from "../../graphql/evento/evento";
import { useEffect, useState } from "react";
import TiempoTabla from "../../components/admin/tiempos/TiempoTabla";
import { io } from "socket.io-client";
import { GET_TRIPULACION } from "../../graphql/evento/tripulacion";

const TiemposScreen = () => {
  const route = useRoute();
  // console.log(route);
  const [selectedEspecialId, setSelectedEspecialId] = useState(null);
  const [selectedEspecial, setSelectedEspecial] = useState(null);
  const [especiales, setEspeciales] = useState([]);
  const [socket, setSocket] = useState(null);

  const [getTripulacion, { data: tripulacionData }] =
    useLazyQuery(GET_TRIPULACION);

  const { data, loading, error, refetch } = useQuery(GET_EVENTO_TIEMPOS, {
    variables: {
      id: route.params.eventoId,
    },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      // configurar especiales
      const allEspeciales = data.evento.etapas.flatMap(
        (etapa) => etapa.especiales
      );
      setEspeciales(allEspeciales);
      if (allEspeciales.length > 0) {
        setSelectedEspecialId(allEspeciales[0]._id);
      }
    },
  });

  useEffect(() => {
    if (route.params.eventoId) {
      refetch(); // Refrescar la consulta cuando se carga la pantalla
    }
  }, [route.params.eventoId]);

  useEffect(() => {
    const newSocket = io("http://192.168.1.50:4000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("nuevoTiempo", (newTiempo) => {
      console.log("Received new tiempo", newTiempo);
      // FETCH DATA tripulacion
      getTripulacion({ variables: { id: newTiempo.tripulacion } });
      setEspeciales((prevEspeciales) => {
        const updatedEspeciales = prevEspeciales.map((especial) => {
          if (especial._id === newTiempo.especialId) {
            const updatedTiempos = especial.tiempos
              ? [...especial.tiempos, newTiempo]
              : [newTiempo];
            return {
              ...especial,
              tiempos: updatedTiempos,
            };
          }
          return especial;
        });

        // if (selectedEspecial && selectedEspecial._id === newTiempo.especialId) {
        //   setSelectedEspecial((prevSelectedEspecial) => ({
        //     ...prevSelectedEspecial,
        //     tiempos: [...(prevSelectedEspecial.tiempos || []), newTiempo],
        //   }));
        // }

        return updatedEspeciales;
      });
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => newSocket.close();
  }, [getTripulacion]);

  useEffect(() => {
    if (tripulacionData) {
      setEspeciales((prevEspeciales) => {
        const updatedEspeciales = prevEspeciales.map((especial) => {
          return {
            ...especial,
            tiempos: especial.tiempos.map((tiempo) => {
              if (tiempo.tripulacion === tripulacionData.tripulacion._id) {
                return {
                  ...tiempo,
                  tripulacion: tripulacionData.tripulacion,
                };
              }
              return tiempo;
            }),
          };
        });

        // if (selectedEspecial) {
        //   setSelectedEspecial((prevSelectedEspecial) => ({
        //     ...prevSelectedEspecial,
        //     tiempos: prevSelectedEspecial.tiempos.map((tiempo) => {
        //       if (tiempo.tripulacion === tripulacionData.tripulacion._id) {
        //         return {
        //           ...tiempo,
        //           tripulacion: tripulacionData.tripulacion,
        //         };
        //       }
        //       return tiempo;
        //     }),
        //   }));
        // }

        return updatedEspeciales;
      });
    }
  }, [tripulacionData]);

  useEffect(() => {
    const especial = especiales.find(
      (especial) => especial._id === selectedEspecialId
    );
    setSelectedEspecial(especial);
  }, [selectedEspecialId, especiales]);

  const handleEspecialPress = (especialId) => {
    setSelectedEspecialId(especialId);
  };

  // console.log(data);

  if (loading)
    return <Text className="text-center text-lg mt-10">Cargando</Text>;

  if (error) return <Text className="text-center text-lg mt-10">Error!!</Text>;

  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10 ">
        {data.evento.nombre}
      </Text>

      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          // style={{ height: 0 }}
        >
          <View className="flex flex-row justify-evenly">
            {data.evento.etapas.map((etapa) => (
              <Text key={etapa._id} className="font-bold mx-1 text-base">
                {etapa.nombre}
                {"\n"}
                {etapa.especiales.map((especial) => (
                  <TouchableOpacity
                    key={especial._id}
                    className="p-2 mx-1 bg-zinc-200 rounded-sm"
                    onPress={() => handleEspecialPress(especial._id)}
                  >
                    <Text>{especial.nombre}</Text>
                  </TouchableOpacity>
                ))}
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>

      {selectedEspecial && (
        <View>
          <TiempoTabla especial={selectedEspecial} />
        </View>
      )}
    </Layout>
  );
};

export default TiemposScreen;
