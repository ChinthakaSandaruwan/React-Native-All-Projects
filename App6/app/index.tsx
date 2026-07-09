import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.MainView1}>
        <Image
          source={require("../assets/images/react-logo.png")}
          style={styles.circle}
        />
        <Text style={styles.loginText}>Login</Text>
        <Text style={styles.welcomeText}>Welcome To My World</Text>
      </View>

      <View style={styles.MainView2}>
        <Text style={styles.Text}>Email</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="chintha@gmail.com"
          placeholderTextColor="#D3D3D3"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.Text}>Password</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="*******"
          placeholderTextColor="#D3D3D3"
          secureTextEntry={true}
        />

        <Text style={styles.forgetpw}>Forget Password ?</Text>

        <View style={styles.loginbtnView}>
          <Pressable style={styles.loginbtn}>
            <Text style={styles.loginTextBtn}>LogIn</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F3F4",
  },

  MainView1: {
    alignItems: "center",
    marginTop: 20,
  },

  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#D3D3D3",
    resizeMode: "contain",
    marginBottom: 10,
  },

  loginText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  welcomeText: {
    fontSize: 16,
    marginTop: 10,
  },

  MainView2: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  Text: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },

  TextInput: {
    backgroundColor: "#999999",
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    color: "#ffffff",
  },

  forgetpw: {
    marginLeft: 10,
    color: "blue",
    marginTop: 5,
  },

  loginbtn: {
    backgroundColor: "green",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    height: 45,
  },

  loginTextBtn: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },

  loginbtnView: {
    marginHorizontal: 10,
    marginTop: 25,
  },
});
