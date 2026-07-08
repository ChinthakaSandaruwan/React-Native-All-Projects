import { Button, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (

    <SafeAreaView>
    <View style={{ backgroundColor: "red", height: 100 }}>
      <StatusBar barStyle="light-content" backgroundColor="green" />
      <Text style={{ fontSize: 20, marginTop: 70, marginLeft: 50 }}>
        Hello, React Native!
      </Text>

      <View style={{ backgroundColor: "blue", height: 100 }}>
        <Text style={{ fontSize: 20, marginTop: 70, marginLeft: 50 }}>
          Hello, React Native!
        </Text>
      </View>
      <View>
        <TextInput
          style={{ backgroundColor: "gray" }}
          placeholder="Name"
        ></TextInput>
      </View>

      <View>
        <Button
          title="Login"
          onPress={() => {
            console.log("Pressed");
          }}
        ></Button>
      </View>
    </View>
    </SafeAreaView>
  );
}
