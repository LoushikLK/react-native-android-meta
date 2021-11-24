import React from 'react'
import { View, Text, Image } from 'react-native'

const Post = () => {
    return (
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginHorizontal: 5 }} >
            <Image source={require("../../image/profile/demoprofile.jpg")} resizeMode="cover" style={{ height: 100, width: 115, marginBottom: 7 }} />
            <Image source={require("../../image/profile/demoprofile.jpg")} resizeMode="cover" style={{ height: 100, width: 115, marginBottom: 7 }} />
            <Image source={require("../../image/profile/demoprofile.jpg")} resizeMode="cover" style={{ height: 100, width: 115, marginBottom: 7 }} />
            <Image source={require("../../image/profile/demoprofile.jpg")} resizeMode="cover" style={{ height: 100, width: 115, marginBottom: 7 }} />

        </View>
    )
}

export default Post
