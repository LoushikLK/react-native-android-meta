


import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/home/HomeScreen'
import ChatScreen from '../screen/chat/ChatScreen'
import SearchScreen from '../screen/search/SearchScreen'
import ProfileScreen from '../screen/profile/Profile'
import Login from '../screen/Login'
import { Ionicons } from '@expo/vector-icons'
import Addpost from '../screen/post/Addpost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import Signup from '../screen/Signup';



import { useSelector, useDispatch } from "react-redux";
import { isLogin } from "../store/actionCreator/index";







const Tab = createBottomTabNavigator();



export default function Navigation() {

    // const [isLogin, setisLogin] = useState(null)
    const [appcomponent, setAppcomponent] = useState(null)
    const [userCredential, setUserCredential] = useState(null)
    const [appReady, setAppReady] = useState(false)

    const isUserLogin = useSelector((state) => state.userLogin.isLogin);


    console.log("isUserLogin", isUserLogin);

    const dispatch = useDispatch();



    useEffect(() => {
        SecureStore.getItemAsync('userCredential').then((value) => {
            if (value) {
                console.log(value);
                setUserCredential(JSON.parse(value))
            }

            // Navigation.navigate("Login")
        }).catch((error) => {
            console.log(error)

        })
        return () => {
            setUserCredential(null)
        }
    }, [])

    // console.log("userCredential", userCredential);

    // SecureStore.deleteItemAsync('userCredential').then((value) => { console.log("done"); }).catch((error) => { console.log(error); })

    useEffect(() => {
        const loginuser = async () => {
            if (userCredential === null) {
                dispatch(isLogin({ isLogin: false }));
                return
            }
            try {

                // console.log("hello" + userCredential.email);

                let option = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: userCredential.email,
                        password: userCredential.password
                    })
                }
                const response = await fetch("http://metaaa.herokuapp.com/usersignin/loginmobile", option)

                const data = await response.json()

                if (response.status === 200) {

                    // console.log("data", data);
                    await AsyncStorage.setItem("userData", JSON.stringify(data.message))


                    dispatch(isLogin({ isLogin: true }));
                    // navigation.navigate("Home")

                }

                else if (response.status !== 200) {

                    alert("Credential do not match .Login again")
                }

                // console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        loginuser()


    }, [userCredential])


    useEffect(() => {

        const getlogin = async () => {



            setAppcomponent(
                isUserLogin === true ?
                    <Tab.Navigator

                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;
                                if (route.name === "Home") {
                                    iconName = focused ? "home" : "home-outline"
                                }
                                else if (route.name === 'Chat') {
                                    iconName = focused ? 'chatbubble' : 'chatbubble-outline';
                                }
                                else if (route.name === 'Search') {
                                    iconName = focused ? 'search' : 'search';
                                }
                                else if (route.name === 'Profile') {
                                    iconName = focused ? 'person' : 'person-outline';
                                }
                                else if (route.name === 'Addpost') {
                                    iconName = focused ? "add-circle" : "add-circle-outline"
                                }
                                // You can return any component that you like here!
                                return <Ionicons name={iconName} size={size} color={color} />;

                            },
                            tabBarActiveTintColor: '#1b9aff',
                            tabBarInactiveTintColor: '#bababa',
                            tabBarStyle: {
                                paddingTop: 10, paddingBottom: 10, height: 50, shadowOffset: { width: 5, height: 3 },
                                shadowColor: "#ffffff",
                                shadowOpacity: 0.5,
                                elevation: 5
                            },
                            tabBarLabelStyle: { display: "none" },
                            tabBarHideOnKeyboard: true,







                        })}
                        backBehavior="history"
                        // sceneContainerStyle={styles.container}
                        initialRouteName="Home"


                    >



                        <Tab.Screen name="Home" component={HomeScreen} options={{ title: "META" }} />
                        <Tab.Screen name="Search" component={SearchScreen} options={{ title: "Search" }} />
                        <Tab.Screen name="Addpost" component={Addpost} options={{ title: "Post" }} />
                        <Tab.Screen name="Chat" component={ChatScreen} options={{ title: "Global Chat", }} />
                        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />




                    </Tab.Navigator>
                    :

                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;
                                if (route.name === "Login") {
                                    iconName = focused ? "log-in" : "log-in-outline"
                                }
                                else if (route.name === 'Signup') {
                                    iconName = focused ? 'person-add' : 'person-add-outline';
                                }

                                // You can return any component that you like here!
                                return <Ionicons name={iconName} size={size} color={color} />;

                            },
                            tabBarActiveTintColor: '#1b9aff',
                            tabBarInactiveTintColor: '#bababa',
                            tabBarStyle: {
                                paddingTop: 10, paddingBottom: 10, height: 50, shadowOffset: { width: 5, height: 3 },
                                shadowColor: "#ffffff",
                                shadowOpacity: 0.5,
                                elevation: 5
                            },

                            tabBarHideOnKeyboard: true,







                        })}
                        backBehavior="history"

                        initialRouteName="Login" >

                        <Tab.Screen name="Login" component={Login} options={{ headerShown: false, title: "Login" }} />
                        <Tab.Screen name="Signup" component={Signup} options={{ headerShown: false, title: "Sign Up" }} />

                    </Tab.Navigator>
            )

        }
        getlogin()

    }, [isUserLogin])



    const MyTheme = {

        "colors": {
            "background": "rgb(1, 1, 1)",
            "border": "rgb(39, 39, 41)",
            "card": "rgb(18, 18, 18)",
            "notification": "rgb(255, 69, 58)",
            "primary": "rgb(10, 132, 255)",
            "text": "rgb(48, 100, 255)",
        },
        "dark": true,


    }





    return (



        <NavigationContainer theme={MyTheme} >
            {appcomponent}
        </NavigationContainer>



    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffee',
        color: "#ffffff"
    },
});
