import { GlobalStyles } from "@/global-styles";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar backgroundColor="purple" barStyle={"light-content"} />

      <View style={styles.View1}></View>
      <View style={styles.View2}></View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  View1: {
    backgroundColor: "red",
    height: 20,
    flex: 1,
  },

  View2: {
    backgroundColor: "blue",
    height: 20,
    flex: 2,
  },
});
