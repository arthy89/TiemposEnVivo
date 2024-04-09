import { View, Text, TouchableOpacity } from "react-native";
import LoginForm from "../../components/users/LoginForm";
import Layout from "../../components/Layout";

const UserScreen = () => {
  return (
    <Layout>
      <Text className="font-bold text-3xl text-center mt-10 ">Usuario</Text>
      <LoginForm />
    </Layout>
  );
};

export default UserScreen;
