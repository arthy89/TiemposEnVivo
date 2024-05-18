import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import getUser from "./assets/getUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

//! screens/pantallas
// Client
import HomeScreen from "./screens/HomeScreen";
import ScreenEvento from "./screens/client/ScreenEvento";
import TiemposScreen from "./screens/client/TiemposScreen";
// Usuario
import UserScreen from "./screens/users/UserScreen";
import Profile from "./screens/users/Profile";
import AdminGeneralScreen from "./screens/admin/AdminGeneralScreen";
import EventoForm from "./screens/admin/EventoForm";
import EventoScreen from "./screens/admin/event/EventoScreen";
import EtapasScreen from "./screens/admin/etapa/EtapasScreen";
import EtapaScreen from "./screens/admin/etapa/EtapaScreen";
import EtapaFormScreen from "./screens/admin/etapa/EtapaFormScreen";
import EspecialFormScreen from "./screens/admin/especial/EspecialFormScreen";
import CatScreen from "./screens/admin/categorias/CatScreen";
import TripScreen from "./screens/admin/tripulaciones/TripScreen";
import TripFormScreen from "./screens/admin/tripulaciones/TripFormScreen";
import CompFormScreen from "./screens/admin/competidor/CompFormScreen";
import AdminTiempoScreen from "./screens/admin/tiempos/AdminTiempoScreen";
import TiempoEspecialScreen from "./screens/admin/tiempos/TiempoEspecialScreen";
import TiempoFormScreen from "./screens/admin/tiempos/TiempoFormScreen";

//? STACKS
// Usauraio
const ClientStackNavigator = createNativeStackNavigator();
const UserStackNavigator = createNativeStackNavigator();

function ClientStack() {
  return (
    <ClientStackNavigator.Navigator>
      {/* Home */}
      <ClientStackNavigator.Screen
        name="Screen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Evento */}
      <ClientStackNavigator.Screen
        name="ScreenEvento"
        component={ScreenEvento}
        options={{
          headerShown: false,
        }}
      />

      {/* Tiempos */}
      <ClientStackNavigator.Screen
        name="TiemposScreen"
        component={TiemposScreen}
        options={{
          headerShown: false,
        }}
      />
    </ClientStackNavigator.Navigator>
  );
}

function UserStack() {
  return (
    <UserStackNavigator.Navigator>
      {/* Login */}
      <UserStackNavigator.Screen
        name="Login"
        component={UserScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Profile */}
      <UserStackNavigator.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />

      {/* Administracion */}
      <UserStackNavigator.Screen
        name="AdminGeneral"
        component={AdminGeneralScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Admin Evento Form */}
      <UserStackNavigator.Screen
        name="EventoForm"
        component={EventoForm}
        options={{
          headerShown: false,
        }}
      />

      {/* Evento */}
      <UserStackNavigator.Screen
        name="EventoScreen"
        component={EventoScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Etapa */}
      <UserStackNavigator.Screen
        name="EtapasScreen"
        component={EtapasScreen}
        options={{
          headerShown: false,
        }}
      />

      <UserStackNavigator.Screen
        name="EtapaScreen"
        component={EtapaScreen}
        options={{
          headerShown: false,
        }}
      />

      <UserStackNavigator.Screen
        name="EtapaFormScreen"
        component={EtapaFormScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Especial */}
      <UserStackNavigator.Screen
        name="EspecialFormScreen"
        component={EspecialFormScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Categorias */}
      <UserStackNavigator.Screen
        name="CatScreen"
        component={CatScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Tripulaciones */}
      <UserStackNavigator.Screen
        name="TripScreen"
        component={TripScreen}
        options={{
          headerShown: false,
        }}
      />

      <UserStackNavigator.Screen
        name="TripFormScreen"
        component={TripFormScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Competidores */}
      <UserStackNavigator.Screen
        name="CompFormScreen"
        component={CompFormScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Tiempos */}
      <UserStackNavigator.Screen
        name="AdminTiempoScreen"
        component={AdminTiempoScreen}
        options={{
          headerShown: false,
        }}
      />

      <UserStackNavigator.Screen
        name="TiempoEspecialScreen"
        component={TiempoEspecialScreen}
        options={{
          headerShown: false,
        }}
      />

      <UserStackNavigator.Screen
        name="TiempoFormScreen"
        component={TiempoFormScreen}
        options={{
          headerShown: false,
        }}
      />
    </UserStackNavigator.Navigator>
  );
}
//? STACKS

//! BOTONES INFERIORES
const Tab = createBottomTabNavigator();
function MyTabs() {
  const usuario = async () => {
    const userAuth = await AsyncStorage.getItem("userAuth");
    if (userAuth) {
      console.log("gaaa");
    } else {
      console.log("xd");
    }
  };

  return (
    <Tab.Navigator>
      {/* Home */}
      <Tab.Screen
        name="Home"
        component={ClientStack}
        options={{
          tabBarLabel: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarBadge: 3,
          headerShown: false,
        }}
      />

      {/* Usuario */}
      <Tab.Screen
        name="User"
        component={UserStack}
        listeners={{
          tabPress: () => {
            usuario();
          },
        }}
        options={{
          tabBarLabel: "User",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
