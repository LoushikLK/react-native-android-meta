


import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screen/home/HomeScreen'
import ChatScreen from './src/screen/chat/ChatScreen'
import SearchScreen from './src/screen/search/SearchScreen'
import ProfileScreen from './src/screen/profile/Profile'
import Login from './src/screen/Login'
import { Ionicons } from '@expo/vector-icons'
import Addpost from './src/screen/post/Addpost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';







const Tab = createBottomTabNavigator();



export default function App() {

  const [isLogin, setisLogin] = useState(null)
  const [appcomponent, setAppcomponent] = useState(null)
  const [userCredential, setUserCredential] = useState(null)





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

  useEffect(() => {
    SecureStore.getItemAsync('userCredential').then((value) => {
      if (value) {
        console.log(value);
        setUserCredential(JSON.parse(value))
      }
      setisLogin("false")
      // Navigation.navigate("Login")
    }).catch((error) => {
      console.log(error)

    })
  }, [])



  useEffect(() => {
    const loginuser = async () => {
      if (userCredential === null) {
        return null
      }
      try {

        console.log("hello" + userCredential.email);

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
          setisLogin("true")

          await AsyncStorage.setItem("userData", JSON.stringify(data.message))

          // navigation.navigate("Home")

        }

        else if (response.status !== 200) {
          await AsyncStorage.setItem("isLogin", "false")
          alert(data.message)
        }

        // console.log(data);
      } catch (error) {
        await AsyncStorage.setItem("isLogin", "false")
      }
    }
    loginuser()
  }, [userCredential])


  useEffect(() => {

    const getlogin = async () => {

      let isLogin = await AsyncStorage.getItem("isLogin")

      setAppcomponent(
        isLogin === "true" ?
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
              tabBarActiveTintColor: '#eb5200',
              tabBarInactiveTintColor: '#bababa',
              tabBarStyle: {
                paddingTop: 10, paddingBottom: 10, height: 50, shadowOffset: { width: 5, height: 3 },
                shadowColor: "#ffffff",
                shadowOpacity: 0.5,
                elevation: 5
              },
              tabBarLabelStyle: { display: "none" },
              tabBarHideOnKeyboard: true,
              headerStyle: {
                backgroundColor: '#ffffff',
              }






            })}
            backBehavior="history"
            sceneContainerStyle={styles.container}
            initialRouteName="Home"


          >



            <Tab.Screen name="Home" component={HomeScreen} options={{ title: "META" }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{ title: "Search" }} />
            <Tab.Screen name="Addpost" component={Addpost} options={{ title: "Post" }} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{ title: "Global Chat", }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />




          </Tab.Navigator>
          : <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
            <Login />
          </SafeAreaView>
      )

      setisLogin(isLogin)
    }
    getlogin()
  }, [])





  // console.log(isLogin);



  return (
    <SafeAreaView style={{ flex: 1 }}>

      <NavigationContainer >
        {appcomponent}
      </NavigationContainer>
    </SafeAreaView>

    // <SafeAreaView style={{ flex: 1 }}>


    //   <NavigationContainer theme={MyTheme}>
    //     {isLogin === "true" ? (
    //       <Tab.Navigator

    //         screenOptions={({ route }) => ({
    //           tabBarIcon: ({ focused, color, size }) => {
    //             let iconName;
    //             if (route.name === "Home") {
    //               iconName = focused ? "home" : "home-outline"
    //             }
    //             else if (route.name === 'Chat') {
    //               iconName = focused ? 'chatbubble' : 'chatbubble-outline';
    //             }
    //             else if (route.name === 'Search') {
    //               iconName = focused ? 'search' : 'search';
    //             }
    //             else if (route.name === 'Profile') {
    //               iconName = focused ? 'person' : 'person-outline';
    //             }
    //             else if (route.name === 'Addpost') {
    //               iconName = focused ? "add-circle" : "add-circle-outline"
    //             }
    //             // You can return any component that you like here!
    //             return <Ionicons name={iconName} size={size} color={color} />;

    //           },
    //           tabBarActiveTintColor: '#eb5200',
    //           tabBarInactiveTintColor: '#bababa',
    //           tabBarStyle: {
    //             paddingTop: 10, paddingBottom: 10, height: 50, shadowOffset: { width: 5, height: 3 },
    //             shadowColor: "#ffffff",
    //             shadowOpacity: 0.5,
    //             elevation: 5
    //           },
    //           tabBarLabelStyle: { display: "none" },
    //           tabBarHideOnKeyboard: true






    //         })}
    //         backBehavior="history"
    //         sceneContainerStyle={styles.container}
    //         initialRouteName="Home"


    //       >



    //         <Tab.Screen name="Home" component={HomeScreen} options={{ title: "META" }} />
    //         <Tab.Screen name="Search" component={SearchScreen} options={{ title: "Search" }} />
    //         <Tab.Screen name="Addpost" component={Addpost} options={{ title: "Post" }} />
    //         <Tab.Screen name="Chat" component={ChatScreen} options={{ title: "Global Chat", }} />
    //         <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
    //       </Tab.Navigator>
    //     ) : (
    //       <>
    //         <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
    //           <Login />
    //         </SafeAreaView>
    //       </>
    //     )}
    //   </NavigationContainer>
    // </SafeAreaView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffee',
    color: "#ffffff"
  },
});
