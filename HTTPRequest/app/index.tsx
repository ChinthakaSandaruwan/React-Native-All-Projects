import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable

        onPress={() => {

          sendRequest();


        }}
        style={({ pressed }) => [
          styles.btn,
          { backgroundColor: pressed ? "#2282ff" : "#006efd" },
        ]}
      >
        <Text style={styles.btnTxt}>Button</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  btnTxt: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});


function sendRequest() {
  const request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      const response = request.responseText;
      console.log(response);
    }
  };

  request.open("GET", "http://192.168.1.13:3000/products/get", true);
  request.send();
}
