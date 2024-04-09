import { View, Text, TouchableOpacity } from "react-native";
import getUser from "../../assets/getUser";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import Layout from "../../components/Layout";
import ProfileCard from "../../components/users/ProfileCard";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
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

  // !ASYNCSTORAGE al inicio siempre devuelve un Null, por lo que necesitamos dejarlo en espera un momento para que cargue bien los datos
  if (!userData) {
    return <Text className="text-center text-lg mt-10">Cargandoooooo!!</Text>;
  }

  // console.log("usuario:", userData);

  const handleSubmit = async () => {
    try {
      await AsyncStorage.removeItem("userAuth");
      // console.log("Token Eliminado");
      navigation.navigate("Login");
    } catch (e) {
      console.error("Error al eliminar token", e);
    }
  };

  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10">
        Perfil de Usuario
      </Text>

      {/* PERFIL CARD */}
      <ProfileCard userData={userData} />

      {/* Boton para acceder a la administracion */}
      <TouchableOpacity
        onPress={() => navigation.navigate("AdminGeneral")}
        className="flex self-center bg-blue-600 rounded-md py-2 w-10/12 mb-3"
      >
        <Text className="text-center font-bold text-lg text-white">
          <Ionicons name="file-tray-sharp" size={15} color="white" />{" "}
          Administrar Eventos
        </Text>
      </TouchableOpacity>

      {/* Boton cerrar sesion */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="flex self-center bg-red-600 rounded-md py-2 w-10/12"
      >
        <Text className="text-center font-bold text-lg text-white">
          <Ionicons name="arrow-undo" size={15} color="white" /> Cerrar Sesión
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};

export default Profile;
