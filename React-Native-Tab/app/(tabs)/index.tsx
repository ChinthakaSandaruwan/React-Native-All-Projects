import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

export default function Index() {
  const [fontLoaded] = useFonts({
    "Poppins-Italic": require("../../assets/fonts/Poppins-Italic.ttf"),
  });

  if (!fontLoaded) {
    console.log("Font Loading");
    return null;
  }

  console.log("font loaded");

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ fontSize: 18,fontFamily:"Poppins-Italic" }}>This Is Home</Text>
    </SafeAreaView>
  );
}
