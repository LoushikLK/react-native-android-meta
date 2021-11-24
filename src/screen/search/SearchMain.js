import React, { useState, useEffect } from 'react'

import { View, Text, ScrollView, TextInput, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SearchMain = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        // console.log(searchTerm)

        const search = async () => {
            if (searchTerm === "") {
                return
            }
            try {

                let options = {
                    method: 'POST',
                    headers: {

                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: searchTerm,
                    })
                }


                const response = await fetch("http://metaaa.herokuapp.com/search", options)

                const data = await response.json()

                if (response.status === 200 && data.message !== null) {
                    // console.log(data)
                    setSearchResults(data.message)
                }

            } catch (error) {
                console.log(error)


            }
        }
        search()
    }, [searchTerm])

    // console.log(searchResults);
    return (
        <ScrollView style={{ backgroundColor: "#ffffff" }}>
            <View>
                <TextInput onChangeText={setSearchTerm} value={searchTerm} placeholder="Search friends,family on meta." style={{ borderWidth: 0.4, borderRadius: 5, paddingHorizontal: 15, paddingVertical: 5, margin: 10 }} />
            </View>
            <View>
                {searchResults.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => { navigation.navigate("ProfileDetails", { name: item.profileName }) }} >
                            <View style={{ flexDirection: "row", padding: 7, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomWidth: 0.3 }}>

                                <Image source={item.profileImage === null ? require("../../image/profile/demoprofile.jpg") : { uri: `${item.profileImage}` }} resizeMode="cover" style={{ height: 40, width: 40, borderRadius: 50, marginHorizontal: 5 }} />
                                <View style={{ flexDirection: "column", flex: 1, marginHorizontal: 5, justifyContent: "center" }}>
                                    <Text style={{ color: "#000000", fontSize: 15 }}>
                                        {item.profileName}
                                    </Text>

                                </View>

                            </View>
                        </TouchableOpacity>
                    )
                })}


            </View>
        </ScrollView>
    )
}

export default SearchMain
