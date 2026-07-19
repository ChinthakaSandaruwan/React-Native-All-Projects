import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
     
     
      <Image 
        source={require("./logo.png")} 
        style={styles.logo}
      />

      <Text style={styles.slogan}>Shop Smart, Stay Powered.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>User Name</Text>
        <TextInput 
          placeholder="Enter Username" 
          style={styles.input}
        />
        
        <Text style={styles.label}>Password</Text>
        <TextInput 
          placeholder="Enter Password" 
          style={styles.input}
        />
      </View>

      <View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  slogan: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  inputContainer: {
    width: '100%', 
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start', 
    marginLeft: '15%',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    height: 45,
    width: '70%', 
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    borderRadius: 25,
    paddingHorizontal: 15, 
    backgroundColor: '#f9f9f9'
  },
  forgotPassword: {
    color: "#007bff",
    marginBottom: 20,
    marginTop: 5,
  },
  loginButton: {
    backgroundColor: "#007bff",
    borderRadius: 25,
    padding: 12,
    width: 200,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
