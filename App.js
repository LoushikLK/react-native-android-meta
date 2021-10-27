


import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screen/home/HomeScreen'
import ChatScreen from './src/screen/chat/ChatScreen'
import SearchScreen from './src/screen/search/SearchScreen'
import ProfileScreen from './src/screen/profile/Profile'
import Login from './src/screen/Login'
import { Ionicons } from '@expo/vector-icons'



const Tab = createBottomTabNavigator();

export default function App() {
  const [isSignIn, setIsSignIn] = useState(true)
  return (
    isSignIn ? (
      <>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline"
                }
                else if (route.name === 'Chat') {
                  iconName = focused ? 'chatbubble' : 'chatbubbles-outline';
                }
                else if (route.name === 'Search') {
                  iconName = focused ? 'search' : 'search';
                }
                else if (route.name === 'Profile') {
                  iconName = focused ? 'person' : 'person-outline';
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#3370ff',
              tabBarInactiveTintColor: '#3370ff',
              tabBarStyle: { backgroundColor: "#0f0f0f", paddingTop: 10, paddingBottom: 10, height: 60 },

            })}
            backBehavior="history"
            sceneContainerStyle={styles.container}

          >

            <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </>) : (
      <Login />
    )
  );
}
const styles = StyleSheet.create({
  container: {

    backgroundColor: '#f0f00f',
    color: "#ffffff"
  },
});
