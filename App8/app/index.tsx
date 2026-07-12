import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  
  
    const [value,setValue] = useState(0);

    useEffect(()=>{

            let value = 1;

         const timer =   setInterval(()=>{
                console.log(value++)
            },1000);

                return(()=>{
                    clearInterval(timer);
                })

    },[]);

    return (

    <SafeAreaView style={styles.container}>

        <Text style={styles.text}>{value}</Text>

      <Pressable style={styles.btn}
      
        onPress={()=>{
            setValue( value +1)
            
        }}
      >
        <Text style={styles.btnText}>Button</Text>
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
    padding: 10,
    alignItems: "center",
    borderRadius:20,
    marginTop:20,
  },

  btnText: {
    color: "white",
    fontWeight: "bold",
  },

  text:{
    alignItems:"center",
    justifyContent:"center",
    fontWeight:"bold",
    textAlign:"center"
  }
});
