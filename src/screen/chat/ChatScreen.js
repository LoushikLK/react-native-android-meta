import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, TextInput, Dimensions, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { io } from "socket.io-client";
import AsyncStorage from '@react-native-async-storage/async-storage';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

const ChatScreen = () => {
    const [user, setUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [allUser, setAllUser] = useState(null);
    const [timesnow, setTimesnow] = useState(null);


    useEffect(() => {
        const user = async () => {
            try {
                let data = await AsyncStorage.getItem("userData")
                setUser(JSON.parse(data))

            } catch (error) {
                alert("An error occoured")
                console.log(error);
            }

        }
        user()
    }, [])
    // console.log(user);
    ///////////////////////socket.io//////////////////////////////


    const socketRef = useRef();

    useEffect(() => {

        if (user === null) {
            console.log("no user");
            return
        }

        socketRef.current = io("http://metaaa.herokuapp.com", {
            transports: ["websocket"],
        });
        let userconnected = JSON.stringify({
            name: user.profileName,
            image: user.profilePicture,
        });

        socketRef.current.on("connect", () => {
            // console.log("connected to socket io");
            socketRef.current.emit("new-user-joined", userconnected);
        });
        socketRef.current.on("user-joined", (details) => {
            // console.log(details);
            let data = JSON.parse(details);
            console.log(data);
            setAllUser(data.length);
            // console.log(name + " joined");
        });
        socketRef.current.on("recieve-chat-message", (data) => {
            // console.log("recieved message", data);
            setConversations([...conversations, data]);
        });
        return () => socketRef.current.disconnect();
    }, [conversations, user]);

    // useEffect(() => {
    //     socketRef.current.on("user-joined", (details) => {
    //         // console.log(details);
    //         let data = JSON.parse(details);
    //         console.log(data);
    //         setAllUser(data.length);
    //         // console.log(name + " joined");
    //     });
    //     socketRef.current.on("user-left", (details) => {
    //         // console.log(details);
    //         let data = JSON.parse(details);
    //         // console.log(data);
    //         setAllUser(data.length);
    //         // console.log(name + " left");
    //     });
    // }, [socketRef]);




    const handleSubmit = (e) => {

        if (newMessage !== "") {
            e.preventDefault();
            socketRef.current.emit("send-chat-message", {
                message: newMessage,
                user: user.profileName,
                image: user.profilePicture,
                time: timesnow,
            });

            setNewMessage("");
        }
        return;
    };




    console.log(conversations + "conversation");

    useEffect(() => {

        const getTime = () => {
            let time = new Date().toLocaleTimeString();
            let timeSplit = time.split(":");
            let hour = timeSplit[0];
            let min = timeSplit[1];
            let ampm = "AM";
            if (hour > 12) {
                hour = hour - 12;
                ampm = "PM";
            }
            if (hour === "00") {
                hour = 12;
            }
            setTimesnow(hour + ":" + min + " " + ampm);
            return `${hour}:${min} ${ampm}`;
        }
        setInterval(() => {
            getTime();
        }, 1000);
        // return () => {
        //     setTimesnow(null);
        // }
        console.log(timesnow + "timesnow");
    }, [timesnow])





    return (
        <View style={{ height: "100%" }}>
            <ImageBackground source={require("../../image/chatbg.jpg")} resizeMode="cover" style={{ flex: 1 }}>

                <Text style={{ width: "100%", textAlign: "center", paddingVertical: 5, fontSize: 20, backgroundColor: "#000000", color: "#42f54e" }}>
                    Global active  {allUser}
                </Text>


                <ScrollView style={{ flex: 1 }} ref={ref => { scrollView = ref }}
                    onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })} >
                    {conversations.map((item, index) => {
                        return (

                            <View key={index} >

                                {item.user === user.profileName ?
                                    <View style={{ width: "100%", alignItems: "flex-end", justifyContent: "flex-end", marginRight: 5 }}>
                                        <Image source={{ uri: `${item.image}` }} resizeMode="cover" style={{ height: 40, width: 40, borderRadius: 50 }} />
                                        <Text style={{ maxWidth: "70%", textAlign: "right", backgroundColor: "#1b9aff", margin: 7, padding: 7, borderRadius: 5 }}>{item.message}</Text>
                                        <Text style={{ marginHorizontal: 10 }}>{item.time}</Text>

                                    </View>

                                    :

                                    <View style={{ width: "100%", alignItems: "flex-start", justifyContent: "flex-start", margin: 5 }}>
                                        <Image source={{ uri: `${item.image}` }} resizeMode="cover" style={{ height: 40, width: 40, borderRadius: 50 }} />


                                        <Text style={{ maxWidth: "70%", textAlign: "left", backgroundColor: "#cbcbcb", margin: 7, padding: 7, borderRadius: 5 }}>{item.user}-  {item.message}</Text>
                                        <Text style={{ marginHorizontal: 10 }}>{item.time}</Text>
                                    </View>
                                }

                            </View>
                        )
                    })}
                </ScrollView>
                <View style={{ flexDirection: "row" }} >
                    <TextInput onChangeText={setNewMessage} value={newMessage} placeholder="Type..." style={{ borderTopWidth: 0.2, borderRadius: 5, position: "relative", bottom: 0, width: "80%", paddingHorizontal: 15, paddingVertical: 7, backgroundColor: "#ffffff" }} />
                    <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: "#1b9aff", alignItems: "center", justifyContent: "center", width: "20%" }} >
                        <Text style={{ color: "#ffffff", fontSize: 15 }}>Send</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

export default ChatScreen
