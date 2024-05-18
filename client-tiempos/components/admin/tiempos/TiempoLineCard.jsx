import { useMutation } from "@apollo/client";
import { View, Text, TouchableOpacity } from "react-native";
import { DEL_TIEMPO } from "../../../graphql/evento/tiempos";

const TiempoLineCard = ({
  tiempo,
  posicion,
  diferenciaPrimero,
  diferenciaAnterior,
  admin,
}) => {
  // console.log(tiempo);
  // console.log(tiempo.horaLlegada);

  const tiempoPena = tiempo.penalizacion;

  function mlsToFormato(tiempoEnMs) {
    const horas = Math.floor(tiempoEnMs / (60 * 60 * 1000));
    tiempoEnMs %= 60 * 60 * 1000;
    const minutos = Math.floor(tiempoEnMs / (60 * 1000));
    tiempoEnMs %= 60 * 1000;
    const segundos = Math.floor(tiempoEnMs / 1000);
    const milisegundos = tiempoEnMs % 1000;
    if (horas > 0) {
      return `${horas.toString().padStart(2, "0")}:${minutos
        .toString()
        .padStart(2, "0")}:${segundos
        .toString()
        .padStart(2, "0")}.${milisegundos.toString().padStart(2, "0")}`;
    } else if (minutos > 0) {
      return `${minutos.toString().padStart(2, "0")}:${segundos
        .toString()
        .padStart(2, "0")}.${milisegundos.toString().padStart(2, "0")}`;
    } else {
      return `${segundos.toString()}.${milisegundos
        .toString()
        .padStart(2, "0")}`;
    }
  }

  const tiempoResultado = tiempo.horaLlegada - tiempo.horaSalida;
  const tiempoFormateado = mlsToFormato(tiempoResultado);

  const dif1For = mlsToFormato(diferenciaPrimero);
  const dif2For = mlsToFormato(diferenciaAnterior);

  // ELIMINAR TIEMPO
  const [delTiempo] = useMutation(DEL_TIEMPO, {
    refetchQueries: ["getEspPro"],
  });

  if (
    !tiempo.tripulacion ||
    !tiempo.tripulacion.piloto ||
    !tiempo.tripulacion.navegante
  ) {
    return <Text>Cargando detalles de la tripulación...</Text>;
  }

  return (
    <View className="mx-2 border border-slate-400 p-2 rounded-md mb-2">
      {/* Pos Cat Num */}
      <View className="flex flex-row justify-between">
        <Text className="text-3xl font-black">{posicion}</Text>
        <Text className="text-xl font-bold">
          {tiempo.tripulacion.categoria} - {tiempo.tripulacion.autoNum}
        </Text>
      </View>

      {/* Tiempo */}
      <View className="flex flex-row justify-between">
        <View>
          <Text className="text-3xl" style={{ marginBottom: -10 }}>
            {tiempoFormateado}
          </Text>
          {tiempoPena !== null && (
            <Text className="text-red-500 font-bold text-base">
              {mlsToFormato(tiempoPena)}
            </Text>
          )}
        </View>
        {diferenciaPrimero !== 0 && (
          <View>
            <Text className="text-right"> + {dif1For}</Text>
            <Text className="text-right"> + {dif2For}</Text>
          </View>
        )}
      </View>

      {/* Datos */}
      <View className="flex flex-row justify-between">
        <View>
          <Text className="text-lg font-medium" style={{ marginBottom: -10 }}>
            {tiempo.tripulacion.piloto.nombre}{" "}
            {tiempo.tripulacion.piloto.apellidos}
          </Text>
          <Text className="text-lg font-medium">
            {tiempo.tripulacion.navegante.nombre}{" "}
            {tiempo.tripulacion.navegante.apellidos}
          </Text>
        </View>
        <View>
          <Text className="text-lg font-medium" style={{ marginBottom: -10 }}>
            {tiempo.tripulacion.autoMarca}
          </Text>
          <Text className="text-lg font-medium">
            {tiempo.tripulacion.autoModelo}
          </Text>
        </View>
      </View>

      {/* Boton Eliminar */}
      {admin != null && (
        <View>
          <TouchableOpacity
            className="flex self-center bg-red-600 rounded-md p-1 w-20"
            onPress={() => {
              delTiempo({
                variables: {
                  id: tiempo._id,
                },
              });
            }}
          >
            <Text className="text-white text-center font-bold">Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TiempoLineCard;
