import { router, useRouter } from "expo-router";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index (){

    const router = useRouter()

    return(
        <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text>Home</Text>
            <Button title="Go To Profile"
               onPress={()=>{
                    router.push("/profile")
               }}
            ></Button>
        </SafeAreaView>
    );

}


