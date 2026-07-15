import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "red" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="home" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="user" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
