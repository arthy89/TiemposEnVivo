import { View, Text } from "react-native";

const Layout = ({ children }) => {
  return <View className="bg-zinc-100 h-full">{children}</View>;
};

export default Layout;
