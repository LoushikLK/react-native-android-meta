import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Platform, Image, TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';


const EditProfile = () => {
    const [image, setImage] = useState(null);
    const [userData, setUserData] = useState(null)
    const [coverImage, setCoverImage] = useState(null)
    const [bio, setBio] = useState("")

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
        const user = async () => {
            try {
                let data = await AsyncStorage.getItem("userData")
                setUserData(JSON.parse(data))

            } catch (error) {
                alert("An error occoured")
                console.log(error);
            }

        }
        user()
    }, [])

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

    useEffect(() => {

        const updateprofilephoto = async (e) => {

            if (image === null) {
                return
            }

            try {

                let url = "http://metaaa.herokuapp.com/updateprofile/updateprofilephoto"
                const formdata = new FormData();

                formdata.append("file", { uri: image, name: "image.jpg", type: "image/jpg" });

                let option = {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                        userid: userData._id,
                    },
                    body: formdata,

                }

                let response = await fetch(url, option);

                let data = await response.json();

                console.log(data);

            } catch (err) {
                console.log(err);
            }
        };
        updateprofilephoto()
    }, [image])
    useEffect(() => {

        const updatecoverphoto = async (e) => {


            if (coverImage === null) {
                return
            }

            try {

                let url = "http://metaaa.herokuapp.com/updateprofile/updatecover"
                const formdata = new FormData();

                formdata.append("file", { uri: coverImage, name: "image.jpg", type: "image/jpg" });

                let option = {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                        userid: userData._id,
                    },
                    body: formdata,

                }

                let response = await fetch(url, option);

                let data = await response.json();

                console.log(data);

            } catch (err) {
                console.log(err);
            }
        };

        updatecoverphoto()
    }, [coverImage])

    const chhoseCoverImage = async () => {
        try {


            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.cancelled) {
                setCoverImage(result.uri);
            }
            else if (result.cancelled) {
                setImage(null)

            }



        } catch (error) {

        }

    }

    const updatebio = () => {
        console.log("update bio");
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff564" }}>

            <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 20 }} >
                <Image source={image === null && userData !== null ? { uri: `${userData.profilePicture}` } : { uri: `${image}` }} resizeMode="cover" style={{ height: 100, width: 100, borderRadius: 50, }} />
                <TouchableOpacity onPress={chhoseImage} >
                    <View style={{ backgroundColor: "#0F7FFF", width: 150, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 7, marginVertical: 5 }} ><Text style={{ color: "#ffffff" }} >Edit Image</Text></View>
                </TouchableOpacity>
            </View>
            <View>
                <View style={{ backgroundColor: "#000000", marginHorizontal: 10, borderRadius: 10, height: 200 }} >

                    {coverImage === null && userData !== null ? (<Image source={{ uri: userData.coverPicture }} resizeMode="contain" style={{ height: "100%", borderRadius: 5, width: "100%" }} />) :
                        (

                            <Image source={{ uri: coverImage }} resizeMode="cover" style={{ height: "100%", borderRadius: 5 }} />
                        )
                    }
                </View>
                <TouchableOpacity onPress={chhoseCoverImage} style={{ width: "100%", height: 40, alignItems: "center", justifyContent: "center", marginTop: 5 }}>
                    <Text style={{ color: "#ffffff", textAlign: "center", backgroundColor: "#0F7FFF", paddingHorizontal: 50, paddingVertical: 10, borderRadius: 5 }}>Edit Cover Image 🔁</Text>
                </TouchableOpacity>



            </View>
            <View>
                <TextInput onChangeText={setBio} value={bio} placeholder="Update bio..." style={{ borderWidth: 0.4, borderRadius: 5, paddingHorizontal: 15, paddingVertical: 5, margin: 10, backgroundColor: "#fffff0" }} />
                <TouchableOpacity onPress={updatebio} style={{ width: "100%", height: 40, alignItems: "center", justifyContent: "center", marginTop: 5 }}>
                    <Text style={{ color: "#ffffff", textAlign: "center", backgroundColor: "#0F7FFF", paddingHorizontal: 50, paddingVertical: 10, borderRadius: 5 }}>Update bio 🔺</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default EditProfile
