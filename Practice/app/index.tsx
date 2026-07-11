import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const [value, setValue] = useState("");
  const [text,setText] = useState("Please Enter Text");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>


        <Text style={styles.text}>{text}</Text>


        <TextInput
              onChangeText={(enteredText)=>{
              setValue(enteredText)
              }}
          placeholder="Enter Your Text"
          placeholderTextColor="#8e8e93"
          style={styles.textInput}
        />


        <TouchableOpacity style={styles.btn}
        
              onPress={()=>{
                  setText(value)
              }}
        >
          <Text style={styles.btnText}>Button</Text>
        </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    padding: 24,
  },
  content: {
    width: "100%",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 24,
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "#f2f2f7",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1c1c1e",
    marginBottom: 16,
  },
  btn: {
    backgroundColor: "#007aff",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
