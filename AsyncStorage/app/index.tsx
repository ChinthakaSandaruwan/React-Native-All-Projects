import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

async function setString() {
  try {
    let name = "Chinthaka";

    await AsyncStorage.setItem("name", name);

    console.log("Data Saved");
  } catch (err) {
    console.error(err);
  }
}

async function getString() {
  try {
    const data = await AsyncStorage.getItem("name");
    console.log("Value : " + data);
  } catch (err) {
    console.error(err);
  }
}

async function removeString() {
  try {
    await AsyncStorage.removeItem("name");
  } catch (err) {
    console.error(err);
  }
}

async function addOtherTypes() {
  try {
    let age: number = 23;
    let isStudent: boolean = true;

    await AsyncStorage.setItem("age", age.toString());
    await AsyncStorage.setItem("isStudent", isStudent.toString());

    console.log("Other type saved");
  } catch (err) {
    console.log(err);
  }
}

async function addArray() {
  try {
    const subjects = ["OOPC", "HDP1", "SAD"];

    const jsonValue = JSON.stringify(subjects);

    await AsyncStorage.setItem("subjects", jsonValue);

    console.log("Array saved");
  } catch (err) {
    console.log(err);
  }
}

async function getArray() {
  try {

    const jsonValue = await AsyncStorage.getItem("subjects");

    if (jsonValue !== null) {

      const subjects = JSON.parse(jsonValue);
      console.log(subjects);
      console.log(subjects[0]);

    }
    
  } catch (err) {
    console.log(err);
  }
}

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setString();
        }}
      >
        <Text style={styles.btnTxt}>Set-String</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          getString();
        }}
      >
        <Text style={styles.btnTxt}>Get-String</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          removeString();
        }}
      >
        <Text style={styles.btnTxt}>Remove-String</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addOtherTypes();
        }}
      >
        <Text style={styles.btnTxt}>add Other Types</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addArray();
        }}
      >
        <Text style={styles.btnTxt}>Add Array</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          getArray();
        }}
      >
        <Text style={styles.btnTxt}>Get Array</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 10,
  },
  btn: {
    backgroundColor: "red",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
  },
  btnTxt: {
    color: "white",
    fontSize: 18,
  },
});
