import { View, Text } from "react-native";

const Layout = ({ children }) => {
  return <View className="bg-zinc-200 h-full">{children}</View>;
};

export default Layout;
