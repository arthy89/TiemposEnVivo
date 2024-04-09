import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getUser from "../../assets/getUser.js";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import Layout from "../../components/Layout";

const AdminGeneralScreen = () => {
  const navigation = useNavigation();
  const [userData, setUser] = useState(null);

  // para evitar bucles infinitos
  useEffect(() => {
    const obtenerUser = async () => {
      try {
        getUser().then((userAuth) => {
          setUser(userAuth);
        });
      } catch (error) {
        console.log("Error al obtener el usuario: ", error);
      }
    };

    obtenerUser();
  }, []);

  if (!userData) {
    return <Text className="text-center text-lg mt-10">Cargandoooooo!!</Text>;
  }

  // Comprobar fecha de expiracion al acceso de la APP
  const fechaExpiracion = new Date(parseInt(userData.expiresAccessAt));
  if (new Date() > fechaExpiracion) {
    (async () => {
      try {
        await AsyncStorage.removeItem("userAuth");
        console.log("Token Eliminado");
        navigation.navigate("Login");
      } catch (e) {
        console.log("Error en la validación de fecha de expiración:", e);
      }
    })();
  }

  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10">
        Administración
      </Text>

      <TouchableOpacity className="flex self-center items-center justify-center bg-green-600 rounded-md py-1 w-8/12 mb-3">
        <Text className="text-center font-bold text-lg text-white">
          <Ionicons name="add-circle" size={15} color="white" /> Nuevo Evento
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};

export default AdminGeneralScreen;
