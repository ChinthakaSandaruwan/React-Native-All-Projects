import { router } from "expo-router";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SecuritySettings() {


  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Security Settings</Text>
      <Button title="Back"
      onPress={()=>{
        router.back();
      }}></Button>
      
    </SafeAreaView>
  );
}
