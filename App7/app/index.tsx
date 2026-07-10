import { useState } from "react";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [count, setCount] = useState(1);
  const [getText, setText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Counter Display */}
        <Text style={styles.counterText}>Count: {count}</Text>
        
        {/* Standard Button */}
        <View style={styles.buttonWrapper}>
          <Button title="Click Me And Login" onPress={() => console.log("Native Button Pressed")} />
        </View>

        {/* TouchableOpacity */}
        <TouchableOpacity style={styles.btn1} onPress={() => console.log("TouchableOpacity Pressed")}>
          <Text style={styles.btn1Text}>Click Me And Login</Text>
        </TouchableOpacity>

        {/* Basic Pressable */}
        <Pressable style={styles.btn2} onPress={() => console.log("Pressable Delete Pressed")}>
          <Text style={styles.btn2Text}>Click Me And Delete</Text>
        </Pressable>

        {/* Press Event Lifecycle Test */}
        <Pressable
          style={styles.pressTest}
          onPress={() => console.log("onpress")}
          onLongPress={() => console.log("onlongpress")}
          onPressIn={() => console.log("onpressin")}
          onPressOut={() => console.log("onpressOut")}
        >
          <Text style={styles.whiteText}>Press Test And Console Out</Text>
        </Pressable>

        {/* Pressable: Background Dynamic Color Change 1 */}
        <Pressable
          style={({ pressed }) => [
            styles.btn1,
            { backgroundColor: pressed ? "#00bbf4" : "#ff006f" },
          ]}
        >
          <Text style={styles.whiteText}>Pink to Light Blue</Text>
        </Pressable>

        {/* Pressable: Background Dynamic Color Change 2 */}
        <Pressable
          style={({ pressed }) => [
            styles.btn1,
            { backgroundColor: pressed ? "red" : "blue" },
          ]}
        >
          <Text style={styles.whiteText}>Blue to Red</Text>
        </Pressable>

        {/* Pressable: Background & Text Dynamic Color Change */}
        <Pressable
          style={({ pressed }) => [
            styles.btn1,
            { backgroundColor: pressed ? "red" : "blue" },
          ]}
        >
          {({ pressed }) => (
            <Text style={{ color: pressed ? "yellow" : "white" }}>
              Text Changes to Yellow
            </Text>
          )}
        </Pressable>

        {/* Pressable: Dynamic Last One */}
        <Pressable
          style={({ pressed }) => [
            styles.btn1,
            { backgroundColor: pressed ? "red" : "blue" },
          ]}
        >
          {({ pressed }) => (
            <Text style={{ color: pressed ? "yellow" : "white" }}>Last One</Text>
          )}
        </Pressable>

        {/* Inline Style Override */}
        <Pressable style={[styles.btn1, { backgroundColor: "red" }]}>
          <Text style={styles.whiteText}>With Inline Red</Text>
        </Pressable>

        {/* Functional Counter Pressable */}
        <Pressable
          style={styles.btn1}
          onPress={() => {
            console.log(count);
            setCount(count + 1);
          }}
        >
          <Text style={styles.whiteText}>Count One by One</Text>
        </Pressable>

        {/* Text Input State Mirror */}
        <Pressable
          style={styles.btn2}
          onPress={() => {
            console.log(getText);
          }}
        >
          <Text style={styles.whiteText}>
            {getText === "" ? "Type below to see text here" : getText}
          </Text>
        </Pressable>

        {/* TextInput Box */}
        <TextInput
          style={styles.textInput}
          placeholder="Type something..."
          placeholderTextColor="#ccc"
          onChangeText={(text) => setText(text)}
          value={getText}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  counterText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  buttonWrapper: {
    marginVertical: 10,
    width: "80%",
  },
  btn1: {
    backgroundColor: "#109809",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    margin: 10,
    width: "80%",
    alignItems: "center",
  },
  btn2: {
    backgroundColor: "#230fb6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    margin: 10,
    width: "80%",
    alignItems: "center",
  },
  btn1Text: {
    color: "white",
    fontWeight: "bold",
  },
  btn2Text: {
    color: "white",
    fontWeight: "bold",
  },
  pressTest: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    margin: 10,
    width: "80%",
    alignItems: "center",
  },
  whiteText: {
    color: "white",
    fontWeight: "600",
  },
  textInput: {
    backgroundColor: "#8d8b8b",
    color: "white",
    width: "80%",
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 15,
  },
});