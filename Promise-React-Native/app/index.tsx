import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={style.container}>
      <TouchableOpacity
        style={style.btn}
        onPress={() => {
          let data = "";
          const myPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
              const x = 5 * 10;
              if (x < 100) {
                resolve(x);
              } else {
                reject("We have an error");
              }
            }, 5000);
          });

          console.log("Log1");

          myPromise
            .then((result) => {
              console.log(result);
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              console.log("Finally block executed");
            });

          console.log("Log2");
          console.log("Log4");

          myPromise.then((result) => {
            console.log("Data2 : " + data);
            console.log("Result : " + result);
          });

          console.log("Data1 : " + data);

          console.log("Log5");
        }}
      >
        <Text style={style.btnText}>Button1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.btn}
        onPress={() => {
          loadUser(10)
            .then((result) => {
              console.log("User loaded with id : " + result);
            })
            .catch(() => {});
        }}
      >
        <Text style={style.btnText}>Button1</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },

  btn: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },

  btnText: {
    color: "white",
    fontSize: 18,
  },
});

function loadUser(id: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(id);
    }, 2000);
  });
}
