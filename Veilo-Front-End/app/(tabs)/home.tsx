import Octicons from '@expo/vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors, Fonts } from '../../constants/theme';

export default function Home() {
    const [chatData, setChatData] = useState();
    const [isRefresh, setIsRefresh] = useState(false);
    const [userName, setUserName] = useState("");
    const [userMobile, setUserMobile] = useState("");
    const [searchMobile, setSearchMobile] = useState("");

    const router = useRouter();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    // Detect system theme (light or dark)
    const colorScheme = useColorScheme() ?? 'light';
    const currentColors = Colors[colorScheme];

    async function loadChats(mobile: string) {
        setIsRefresh(true);
        try {
            const response = await fetch(apiUrl + "/chat/get-chats?mobile=" + mobile);
            const data = await response.json();
            setIsRefresh(false);

            if (response.ok) {
                setChatData(data);
            } else {
                alert(response.status + " : " + data.msg);
            }
        } catch (err) {
            console.log(err);
            setIsRefresh(false);
        }
    }

    async function getUser() {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
            const userObj = JSON.parse(userString);
            setUserName(userObj.fname);
            setUserMobile(userObj.mobile);
            loadChats(userObj.mobile);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getUser();
        }, [])
    );

    function timeFormat(time: string) {
        const formattedTime = new Date(time).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
        return formattedTime;
    }

    async function searchNewUser() {
        if (searchMobile === "") return;

        try {
            const response = await fetch(apiUrl + "/chat/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_1: userMobile, user_2: searchMobile })
            });

            const data = await response.json();

            if (response.ok || response.status === 200) {
                setSearchMobile("");
                router.push({
                    pathname: "/chat",
                    params: {
                        chatId: data.chat_id,
                        userName: searchMobile,
                        userMobile: searchMobile
                    }
                });
            } else {
                alert(data.msg);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Dynamic styles based on theme selection
    const dynamicStyles = {
        container: {
            backgroundColor: currentColors.background,
        },
        text: {
            color: currentColors.text,
            fontFamily: Fonts.sans,
        },
        searchView: {
            backgroundColor: colorScheme === 'dark' ? '#242729' : '#f3f3f3',
        },
        searchInput: {
            color: currentColors.text,
            fontFamily: Fonts.sans,
            flex: 1,
        }
    };

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>

            <View style={styles.headerView}>
                <Text style={[{ fontSize: 18 }, dynamicStyles.text]}>{userName}</Text>

                  {/* ghost icon  */}
            <MaterialCommunityIcons  name="ghost-outline" size={24} color={currentColors.text} 
            
            onPress={() =>

                router.push("/ghost_chat")
            }
            
            />
            </View>


          


            <View style={[styles.searchView, dynamicStyles.searchView]}>
              
                <TextInput
                    placeholder='Search by mobile'
                    placeholderTextColor={currentColors.tabIconDefault}
                    autoFocus={false}
                    style={dynamicStyles.searchInput}
                    value={searchMobile}
                    onChangeText={setSearchMobile}
                    keyboardType="phone-pad"
                />

                  <Octicons name="search" size={20} color={currentColors.icon} 
                onPress={searchNewUser}
                
                />
                
            </View>
           
          

            <FlatList
                data={chatData}
                keyExtractor={(item, index) => item.chat_id?.toString() || index.toString()}
                renderItem={({ item }) => {
                    const userImg = item.user?.profile_picture || item.user?.img;
                    const lastMsg = item.last_message;
                    const isValidImg = userImg && userImg !== "" && !userImg.endsWith("/undefined") && !userImg.endsWith("/null");
                    return (
                        <Pressable style={styles.chatView} onPress={() => {
                            router.push({
                                pathname: "/chat",
                                params: {
                                    chatId: item.chat_id || lastMsg?.chat_chat_id,
                                    userName: item.user?.fname + " " + item.user?.lname,
                                    userMobile: item.user?.mobile,
                                    userImg: isValidImg ? userImg : ""
                                }
                            });
                        }}>
                            <Image
                                source={{ uri: isValidImg ? apiUrl + userImg : "https://img.icons8.com/ios-filled/50/user-male-circle.png" }}
                                style={styles.profilePic}
                            />
                            <View style={{ gap: 3, flex: 1 }}>
                                <Text style={[styles.nameTxt, { color: currentColors.text, fontFamily: Fonts.sans }]}>
                                    {item.user?.fname + " " + item.user?.lname}
                                </Text>
                                <Text numberOfLines={1} style={[styles.msgTxt, { color: currentColors.tabIconDefault, fontFamily: Fonts.sans }]}>
                                    {lastMsg ? lastMsg.message : "No Messages Yet"}
                                </Text>
                            </View>
                            <Text style={[styles.time, { color: currentColors.tabIconDefault, fontFamily: Fonts.sans }]}>
                                {lastMsg ? timeFormat(lastMsg.sent_at) : ""}
                            </Text>
                        </Pressable>
                    );
                }}
                refreshing={isRefresh}
                onRefresh={() => {
                    if (userMobile) {
                        loadChats(userMobile);
                    }
                }}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        gap: 15,
        flex: 1
    },
    headerView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    searchView: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 50,
        gap: 10,
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    chatView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        paddingBottom: 15,
    },
    msgTxt: {
        fontSize: 14,
    },
    nameTxt: {
        fontSize: 16,
        fontWeight: "600"
    },
    time: {
        textAlign: 'right',
        fontSize: 12,
    }
});