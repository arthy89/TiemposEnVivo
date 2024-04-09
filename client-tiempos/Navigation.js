import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

//! screens/pantallas
import HomeScreen from "./screens/HomeScreen";
// Usuario
import UserScreen from "./screens/users/UserScreen";
import Profile from "./screens/users/Profile";
import AdminGeneralScreen from "./screens/admin/AdminGeneralScreen";

//? STACKS
// Usauraio
const UserStackNavigator = createNativeStackNavigator();
function UserStack() {
  return (
    <UserStackNavigator.Navigator initialRouteName="Login">
      {/* Login */}
      <UserStackNavigator.Screen
        name="Login"
        component={UserScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Perfil */}
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
    </UserStackNavigator.Navigator>
  );
}
//? STACKS

//! BOTONES INFERIORES
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      {/* Home */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
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
