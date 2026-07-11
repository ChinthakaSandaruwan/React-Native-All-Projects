import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.btn}>
        <Text style={styles.btnText}></Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  btn: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
  },

  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
