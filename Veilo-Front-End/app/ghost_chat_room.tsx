import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Fonts } from '../constants/theme';

export default function GhostChatRoom() {
    const colorScheme = useColorScheme() ?? 'light';
    const currentColors = Colors[colorScheme];
    const systemFont = Fonts?.sans || 'System';

    const [chatHistory, setChatHistory] = useState<any[]>([]);
    const [loggedUser, setLoggedUser] = useState<any>();
    const [text, settext] = useState("");

    const webSocket = useRef<WebSocket>(null);

    const router = useRouter();

    const params = useLocalSearchParams();
    const chatId = params.chatId;

    useEffect(() => {

        loadChatHistory();
        connectWebSocket();

        return () => {
            webSocket.current?.close();
        }

    }, []);

    async function loadChatHistory() {

        const apiUrl = process.env.EXPO_PUBLIC_API_URL;

        const response = await fetch(apiUrl + "/ghost-chat-history/get-history?id=" + chatId);

        const data = await response.json();

        if (response.ok) {
            setChatHistory(data);
        } else {
            console.log(response.status + "  : " + data.msg);
            alert("Something went wrong");
        }

    }

    function timeFormat(time: string) {

        const formattedTime = new Date(time).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

        return formattedTime;

    }

    async function connectWebSocket() {

        const user = await AsyncStorage.getItem("user");

        let userObj: any;

        if (user) {
            userObj = JSON.parse(user);
            setLoggedUser(userObj);
        }

        const wsUrl = process.env.EXPO_PUBLIC_WS_URL || "ws://192.168.1.9:3000";
        webSocket.current = new WebSocket(wsUrl);

        console.log("Web socket starting...")

        webSocket.current.onopen = () => {
            console.log("Connected to webSocket");

            if (webSocket.current) {

                const data = {
                    type: "register",
                    data: userObj.mobile
                };

                webSocket.current.send(JSON.stringify(data));

            }

        }

        webSocket.current.onmessage = (event) => {

            const message = JSON.parse(event.data);

            console.log(message);

            setChatHistory(chatArray => [message, ...chatArray]);

        }

    }

    function deleteChat() {
        if (Platform.OS === 'web') {
            const consent = confirm("Are you sure you want to delete this ghost chat?");
            if (consent) performDelete();
        } else {
            Alert.alert(
                "Delete Chat",
                "Are you sure you want to delete this ghost chat?",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", style: "destructive", onPress: performDelete }
                ]
            );
        }
    }

    async function performDelete() {
        try {
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;
            const response = await fetch(apiUrl + "/ghost-chat/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatId })
            });

            if (response.ok) {
                if (Platform.OS === 'web') {
                    alert("Ghost chat deleted successfully");
                } else {
                    Alert.alert("Success", "Ghost chat deleted successfully");
                }
                router.back();
            } else {
                let msg = "Unknown error";
                try {
                    const data = await response.json();
                    msg = data.msg || msg;
                } catch (_) {}
                if (Platform.OS === 'web') {
                    alert(msg);
                } else {
                    Alert.alert("Error", msg);
                }
            }
        } catch (error) {
            console.error("Delete ghost chat error: ", error);
            if (Platform.OS === 'web') {
                alert("Something went wrong");
            } else {
                Alert.alert("Error", "Something went wrong");
            }
        }
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={[styles.container, { backgroundColor: currentColors.background }]}
        >

            <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>

                <View style={[styles.headerView, { backgroundColor: currentColors.background, borderBottomWidth: 1, borderBottomColor: colorScheme === 'dark' ? '#2c2e30' : '#e5e5e5' }]}>
                    <Entypo name="chevron-left" size={24} color={currentColors.text} onPress={() => {
                        router.back();
                    }} />
                    <View style={[styles.ghostAvatar, { backgroundColor: colorScheme === 'dark' ? '#25282a' : '#f0f0f0' }]}>
                        <MaterialCommunityIcons name="ghost-outline" size={28} color={colorScheme === 'dark' ? '#9BA1A6' : '#555'} />
                    </View>
                    <View style={{ flex: 1, gap: 3 }}>
                        <Text style={[styles.nameTxt, { color: currentColors.text, fontFamily: systemFont }]}>Anonymous</Text>
                        <View style={styles.statusView}>
                            <View style={styles.statusBall} />
                            <Text style={[styles.statusTxt, { color: currentColors.tabIconDefault, fontFamily: systemFont }]}>Ghost Mode</Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons name="delete-circle-outline" size={30} color={currentColors.text}
                        onPress={() => {
                            deleteChat();
                        }}
                    />
                </View>

                <View style={[styles.bodyView, { backgroundColor: colorScheme === 'dark' ? '#1c1e20' : '#eff3ff' }]}>

                    <FlatList
                        data={chatHistory}
                        renderItem={({ item }) => {

                            return (

                                <View style={[styles.messageView, { alignItems: loggedUser?.mobile === item.sender ? "flex-end" : "flex-start" }]}>
                                    <Text style={[
                                        styles.message,
                                        loggedUser?.mobile === item.sender ? styles.sendMsg : styles.receiveMsg,
                                        loggedUser?.mobile === item.sender
                                            ? { backgroundColor: '#7c3aed', color: 'white', fontFamily: systemFont }
                                            : { backgroundColor: colorScheme === 'dark' ? '#25282a' : '#ffffff', color: currentColors.text, fontFamily: systemFont }
                                    ]}>
                                        {item.message}
                                    </Text>
                                    <Text style={[styles.msgTime, { color: currentColors.tabIconDefault, fontFamily: systemFont }]}>{timeFormat(item.sent_at)}</Text>
                                </View>


                            );

                        }}
                        inverted

                    />


                </View>

                <View style={[styles.inputView, { backgroundColor: colorScheme === 'dark' ? '#1c1e20' : '#eff3ff' }]}>

                    <TextInput 
                        style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#25282a' : 'white', color: currentColors.text, fontFamily: systemFont }]} 
                        placeholder='Enter Message' 
                        placeholderTextColor={currentColors.tabIconDefault}
                        onChangeText={settext} 
                        value={text} 
                    />

                    <Pressable style={[styles.sendBtn, { backgroundColor: colorScheme === 'dark' ? '#fff' : '#7c3aed' }]} onPress={() => {
                        const trimmedText = text.trim();
                        if (trimmedText.length === 0) return;

                        if (webSocket.current) {
                            const msg = {
                                message: trimmedText,
                                sent_at: new Date().toString(),
                                sender: loggedUser.mobile
                            };

                            setChatHistory(oldChat => [msg, ...oldChat]);

                            const data = {
                                type: "ghost_chat",
                                data: trimmedText,
                                sender: loggedUser.mobile,
                                chatId: chatId
                            };

                            settext("");

                            webSocket.current.send(JSON.stringify(data));
                        }
                    }}>
                        <MaterialCommunityIcons name="send" size={30} color={colorScheme === 'dark' ? '#151718' : 'white'} />
                    </Pressable>

                </View>

            </SafeAreaView>

        </KeyboardAvoidingView>


    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    headerView: {
        backgroundColor: "white",
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    ghostAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
    },
    nameTxt: {
        color: "black",
        fontWeight: '500',
        fontSize: 18
    },
    statusView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    statusTxt: {
        color: "#a4a4a4",
        fontSize: 12,
    },
    statusBall: {
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: "#b47fff"
    },

    bodyView: {
        flex: 1,
        backgroundColor: "#eff3ff",
        padding: 20,
    },

    msgTime: {
        color: "#8f8f8f",
        fontSize: 12,
    },

    message: {
        fontWeight: "600",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        maxWidth: "90%",
    },

    messageView: {
        width: "100%",
        gap: 5,
    },

    sendMsg: {
        backgroundColor: "#7c3aed",
        color: "white",
        borderTopRightRadius: 0,
    },

    receiveMsg: {
        backgroundColor: "#ffffff",
        color: "black",
        borderTopLeftRadius: 0,
    },


    inputView: {
        backgroundColor: "#eff3ff",
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },

    input: {
        backgroundColor: "white",
        flex: 1,
        height: 50,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    sendBtn: {
        backgroundColor: "#7c3aed",
        padding: 10,
        borderRadius: 50,
        width: 50,
        height: 50
    },

});
