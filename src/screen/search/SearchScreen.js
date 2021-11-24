import React from 'react'
import { View, Text } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';
import SearchMain from './SearchMain';
import ProfileDetails from '../profile/ProfileDetails';

const Stack = createStackNavigator();
const SearchScreen = () => {
    return (
        <Stack.Navigator initialRouteName="SearchMain">
            <Stack.Screen name="SearchMain" options={{ headerShown: false }} component={SearchMain} />
            <Stack.Screen name="ProfileDetails" options={{ headerShown: false }} component={ProfileDetails} />

        </Stack.Navigator>
    )
}

export default SearchScreen
