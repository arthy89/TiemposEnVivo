import AsyncStorage from "@react-native-async-storage/async-storage";

async function getUser() {
  try {
    const userAuth = await AsyncStorage.getItem("userAuth");
    return userAuth != null ? JSON.parse(userAuth) : null;
  } catch (error) {
    console.error("Error al obtener el token:", error);
    return null;
  }
}

export default getUser;

// getUser().then((userAuth) => {
//   console.log("token obtenido:", userAuth);
// });
