import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.text}>Hello</Text> */}

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          console.log("Log 1");
          console.log("Log 2");

          const startTime = Date.now();

          while (Date.now() - startTime < 5000) {}

          console.log("Log 3");
          console.log("Log 4");
          console.log("Log 5");
        }}
      >
        <Text style={styles.btnText}>BTN 1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          console.log("Log 11");
          console.log("Log 12");

          setTimeout(() => {
            console.log("Log 13");
          }, 5000);

          console.log("Log 14");
          console.log("Log 15");
        }}
      >
        <Text style={styles.btnText}>BTN 2</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          console.log("Log 6");
          console.log("Log 7");
          let data = "";

          setTimeout(() => {
            data = "hello";
          }, 5000);
          console.log("Log 8");
          console.log("Log 9");

          setTimeout(() => {
            console.log(data);
          }, 6000);

          console.log("Log 10");
        }}
      >
        <Text style={styles.btnText}>BTN 3</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 10,
  },

  btn: {
    backgroundColor: "blue",
    marginTop: 10,
    width: "100%",
    height: "auto",
    borderRadius: 15,
  },

  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    color: "white",
    textAlign: "center",
  },
});
