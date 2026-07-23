import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();

  const data = useLocalSearchParams();

  console.log(data.id);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Profile</Text>

      <Button
        title="Back"
        onPress={() => {
          router.back();
        }}
      ></Button>
      
    </SafeAreaView>
  );
}
