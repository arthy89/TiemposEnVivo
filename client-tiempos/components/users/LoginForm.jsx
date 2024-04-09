import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import React, { createContext, useState, useContext } from "react";

import { LOGIN } from "../../graphql/login";

const LoginForm = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const UserContext = createContext();

  const [initLogin, { loading, error }] = useMutation(LOGIN);

  const handleSubmit = async (values) => {
    try {
      //   console.log(values.email);
      const { data } = await initLogin({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      // console.log("Respuesta del Login: ", data);
      const { usuario, token } = data.login;
      // console.log("Usuario:", usuario);
      // console.log("Token:", token);
      await AsyncStorage.setItem("userAuth", JSON.stringify(usuario));
      // await AsyncStorage.setItem("token", token);
      // console.log(await AsyncStorage.getItem("userAuth"));

      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error durante el login: ", error);
    }
  };

  return (
    <View>
      <Text className="text-center font-bold text-4xl m-2">
        Inicio de Sesión
      </Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text className="mx-5 font-bold text-xl">Correo</Text>
            <TextInput
              className="flex self-center bg-zinc-300 px-4 py-3 rounded-md w-11/12 mb-3"
              placeholder="ejemplo@gmail.com"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />

            <Text className="mx-5 font-bold text-xl">Contraseña</Text>
            <TextInput
              className="flex self-center bg-zinc-300 px-4 py-3 rounded-md w-11/12 mb-3 "
              placeholder="Ingrese su contraseña"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              className="flex self-center bg-red-600 rounded-md py-2 w-10/12"
            >
              <Text className="text-center font-bold text-lg text-white">
                Ingresar
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;
