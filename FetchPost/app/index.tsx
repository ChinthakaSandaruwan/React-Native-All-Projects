import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.btn}
        onPress={() => {
          getRequest();
        }}
      >
        <Text style={styles.btnText}>Fetch Get Request</Text>
      </Pressable>


         <Pressable
        style={styles.btn}
        onPress={() => {
          sendPost();
        }}
      >
        <Text style={styles.btnText}>Fetch Get Request</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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

const getRequest = async () => {
  const response = await fetch("http://192.168.1.11:3000/user/get-users");

  if (response.ok) {
    const data = await response.json();
    console.log(data);
  } else {
    console.log("Something went wrong");
  }
};

const sendPost = async () => {

  const userData = {
    name:"Chint4haka",
    email:"chinth4akasw000@gmail.com",
    password:"1234321555"
  };

  const json = JSON.stringify(userData)

  const response = await fetch("http://192.168.1.11:3000/user/add-user", {
    method: "POST",
    body:json,
    headers:{"Content-Type" : "application/json"}
  });

  if (response.ok) {
    const data = await response.text();
    console.log(data);
  } else {
    console.error("Something went wrong in Post");
  }
};
