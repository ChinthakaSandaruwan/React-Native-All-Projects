import { GlobalStyles } from "@/global-styles";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  let student = {
    name: "Chinthaka",
    age: 23,
    gmail: "chinthakasw000@gmail.com",
  };

  console.log(student.age);

  let subjects = [10, 30, 80, 55, 465, 64852, 458, "OOP", "DBMS"];

  console.log(subjects[5]);

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
