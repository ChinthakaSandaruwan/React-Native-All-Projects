import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.continer}>
      <Pressable
        style={styles.btn}
        onPress={() => {
          getUsers();
        }}
      >
        <Text style={styles.btnText}>Fetch Get Request</Text>
      </Pressable>

      <Pressable
        style={styles.btn}
        onPress={() => {
          getProduct();
        }}
      >
        <Text style={styles.btnText}>Fetch Get Request</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },

  btn: {
    backgroundColor: "blue",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 15,

    padding: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});

async function getUsers() {
  const response = await fetch("http://192.168.1.2:3000/user/get-user", {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
  } else {
    console.log("error");
  }
}

async function getProduct() {
  const response = await fetch("http://192.168.1.2:3000/product/get-product", {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();

    console.log(data);
  } else {
    console.log("error");
  }
}
