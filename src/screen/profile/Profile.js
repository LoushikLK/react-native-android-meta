

import React from 'react'
import { View, Text } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';
import EditProfile from './EditProfile';
import ProfileMain from './ProfileMain';

const Stack = createStackNavigator();
const Profile = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileMain" options={{ headerShown: false }} component={ProfileMain} />
            <Stack.Screen name="EditProfile" options={{ headerShown: false }} component={EditProfile} />
        </Stack.Navigator>
    )
}

export default Profile

