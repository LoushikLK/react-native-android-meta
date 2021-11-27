



import React from 'react'
import { View, Text } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';
import SignupMain from '../screen/signup/SignupMain'
import VerifyOtp from './signup/VerifyOtp';
import CompleteProfile from './signup/CompleteProfile';
const Stack = createStackNavigator();
const Signup = () => {
    return (
        <Stack.Navigator initialRouteName="SignupMain">
            <Stack.Screen name="SignupMain" options={{ headerShown: false }} component={SignupMain} />
            <Stack.Screen name="VerifyOtp" options={{ headerShown: false }} component={VerifyOtp} />
            <Stack.Screen name="CompleteProfile" options={{ headerShown: false }} component={CompleteProfile} />

        </Stack.Navigator>
    )
}

export default Signup
