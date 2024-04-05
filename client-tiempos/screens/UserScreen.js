import { View, Text } from "react-native";
import LoginForm from "../components/users/LoginForm";

const UserScreen = () => {
  return (
    <View>
      <Text className="font-bold text-3xl text-center mt-10 ">Usuario</Text>
      <LoginForm />
    </View>
  );
};

export default UserScreen;
