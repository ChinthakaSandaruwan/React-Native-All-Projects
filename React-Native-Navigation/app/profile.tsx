import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>

        <TouchableOpacity 
          style={styles.btn}
          onPress={() => router.back()}
          // onPress={() => router.push("/")} 
          // onPress={() => router.replace("/")}
          activeOpacity={0.7}
        >
          <Text style={styles.btnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  btn: {
    backgroundColor: "#007AFF", 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25, // Kept your fully rounded capsule style
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
