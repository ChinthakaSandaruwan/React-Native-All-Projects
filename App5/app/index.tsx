import { View, Text, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style = {styles.box1} >
        <Text>Item 1</Text>
      </View>
      <View style = {styles.box2} >
        <Text>Item 2</Text>
      </View>
      <View style = {styles.box3} >
        <Text>Item 3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
        flex: 1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    
  },

    box1: {
        backgroundColor: "red",
        width: 50,
        height: 50,
       marginLeft: 10,
    },

       box2: {
        backgroundColor: "red",
        width: 50,
        height: 50,
        marginLeft: 10,
    },

        box3: {
        backgroundColor: "red",
        width: 50,
        height: 50  ,
       marginLeft: 10,
    },

});
