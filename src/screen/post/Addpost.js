import React, { useEffect, useState } from 'react'
import { View, Text, Platform, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';




export default function Addpost({ navigation }) {
    const [userData, setUserData] = useState(null)
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("")
    const [location, setLocation] = useState("")
    const [postLoading, setPostLoading] = useState("Post")

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                let data = await AsyncStorage.getItem("userData")
                setUserData(JSON.parse(data))

            } catch (error) {
                alert("An error occoured 😯")
                console.log(error);
            }

        })()

    }, [])


    async function handleSubmit(e) {
        e.preventDefault();
        if (image === null) {
            alert("Please fill all the fields")
            return
        }
        try {
            setPostLoading("Posting...")

            // TODO: do something with -> this.state.file

            let url = "http://metaaa.herokuapp.com/postimage";

            const formdata = new FormData();

            formdata.append("file", { uri: image, name: "image.jpg", type: "image/jpg" });

            let imgdata = JSON.stringify({
                id: userData._id,
                location: location,
                caption: caption,
            });

            formdata.append("details", imgdata);

            let option = {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: formdata,

            }

            const response = await fetch(url, option);

            const data = await response.json();

            console.log(data);

            if (response.status === 200) {

                alert("Post Successfully 😄💯")
            }



            setPostLoading("Post ")
            setCaption("");
            setLocation("");
            setImage(null);
        } catch (error) {
            console.log(error);
        }
    }





    const chhoseImage = async () => {
        try {


            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.cancelled) {
                setImage(result.uri);
            }
            else if (result.cancelled) {
                setImage(null)
                navigation.goBack()
            }



        } catch (error) {

        }

    }



    return (
        <ScrollView style={{ flex: 1, height: "100%" }}>
            <View>
                {image === null ? (<Image source={require("../../image/post/uploadimage.png")} resizeMode="contain" style={{ height: 270, margin: 5, borderRadius: 5, width: "100%" }} />) :
                    (

                        <Image source={{ uri: image }} resizeMode="cover" style={{ height: 270, margin: 5, borderRadius: 5 }} />
                    )
                }
                <TouchableOpacity onPress={chhoseImage} style={{ width: "100%", height: 40, alignItems: "center", justifyContent: "center", marginTop: 5 }}>
                    <Text style={{ color: "#ffffff", textAlign: "center", backgroundColor: "#0F7FFF", paddingHorizontal: 50, paddingVertical: 10, borderRadius: 5 }}>Choose Image 📷</Text>
                </TouchableOpacity>



            </View>
            <View>
                <TextInput placeholder="😁 Add caption" onChangeText={setCaption} value={caption} style={style.textInput} />
                <TextInput placeholder="🌏 Location" onChangeText={setLocation} value={location} style={style.textInput} />

            </View>
            <TouchableOpacity onPress={handleSubmit} style={{ width: "100%", alignItems: "center", justifyContent: "center", marginTop: 50 }}>
                <Text style={{ color: "#ffffff", textAlign: "center", backgroundColor: "#0F7FFF", paddingHorizontal: 50, paddingVertical: 10, borderRadius: 5, fontSize: 20 }}>{postLoading}</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    textInput: {
        borderBottomWidth: 0.4, borderRadius: 5, paddingHorizontal: 15, paddingVertical: 7, margin: 10, backgroundColor: "#ffffff"
    }
})