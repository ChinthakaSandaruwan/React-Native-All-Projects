import { useRouter } from "expo-router";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Home</Text>
      <Button
        title="Go To Profile"
        onPress={() => {
          router.push("/profile");
        }}
      ></Button>

       <Button
        title="Go To Profile"
        onPress={() => {
          const data = {
            id: 5,
            name: "Chinthaka",
          };
          router.push({
            pathname: "/profile",
            params: data,
          });
        }}
      ></Button>

             <Button
        title="Go To Profile"
        onPress={() => {
          router.push({
            pathname: "/profile",
            params: {id:5, name:"Chinthaka"},
          });
        }}
      ></Button>

      <Button
        title="Settings Pages"
        onPress={() => {
          router.push("/settings");
        }}
      ></Button>
    </SafeAreaView>
  );
}
