import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileCard = ({ userData }) => {
  // console.log(userData);

  return (
    <View className="p-5">
      {/* Nombre */}
      <View className="mb-2">
        <Text className="font-bold text-lg">Nombre</Text>
        <View className="bg-zinc-200 p-3 rounded-lg">
          <Text className="text-base">{userData.nombre}</Text>
        </View>
      </View>

      {/* Email */}
      <View className="mb-2">
        <Text className="font-bold text-lg">Correo</Text>
        <View className="bg-zinc-200 p-3 rounded-lg">
          <Text className="text-base">{userData.email}</Text>
        </View>
      </View>

      {/* Organizacion */}
      <View className="mb-2">
        <Text className="font-bold text-lg">Organización</Text>
        <View className="bg-zinc-200 p-3 rounded-lg">
          <Text className="text-base">
            {userData.org.nombre} - {userData.org.region}
          </Text>
        </View>
      </View>

      {/* Rol */}
      <View className="mb-2">
        <Text className="font-bold text-lg">Cargo</Text>
        <View className="bg-zinc-200 p-3 rounded-lg">
          <Text className="text-base">{userData.rol.rol_name}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;
