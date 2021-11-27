import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Image, Button, Dimensions, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';




const CompleteProfile = ({ navigation }) => {
    const [bio, setBio] = useState("")
    const [profileImage, setProfileImage] = useState(null)
    const [location, setLocation] = useState("")
    const [gender, setGender] = useState(null)
    const [relationshipStatus, setRelationshipStatus] = useState(null)
    const [profession, setProfession] = useState("")
    const [dateofbirth, setDateofbirth] = useState("")
    const [doneButton, setDoneButton] = useState("Update ✅")


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
                setProfileImage(result.uri);
            }
            else if (result.cancelled) {
                setProfileImage(null)

            }



        } catch (error) {

        }

    }

    let day = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ];
    let month = [
        { month: "January", value: 1 },
        { month: "February", value: 2 },
        { month: "March", value: 3 },
        { month: "April", value: 4 },
        { month: "May", value: 5 },
        { month: "June", value: 6 },
        { month: "July", value: 7 },
        { month: "August", value: 8 },
        { month: "September", value: 9 },
        { month: "October", value: 10 },
        { month: "November", value: 11 },
        { month: "December", value: 12 },
    ];

    let year = [];

    for (let i = 1900; i <= 2020; i++) {
        year.push(i);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            profileImage === null ||
            profileImage === "" ||
            bio === "" ||
            location === "" ||
            relationshipStatus === null ||
            profession === "" ||
            dateofbirth === "" ||
            gender === null
        ) {
            alert("Please fill all the fields");
            console.log("fill all the blanks");
            return;
        } else if (bio.length > 40) {
            alert("Bio should be less than 40 characters");
            console.log("Keep bio length under 40 letter.");
            return;
        } else if (profession.length > 15 || location.length > 15) {
            alert("Profession and Location should be less than 15 characters");
            console.log("Keep profession and location length under 15 letter.");
            return;
        }

        try {
            setDoneButton("Loading...☁️")


            let uri = "http://metaaa.herokuapp.com/updateprofile";

            let formData = new FormData();

            formData.append("file", { uri: profileImage, name: "image.jpg", type: "image/jpg" });

            let details = {
                location: location,
                bio: bio,
                relationStatus: relationshipStatus,
                profession: profession,
                gender: gender,
                dateofbirth: dateofbirth
            };

            formData.append("details", JSON.stringify(details));

            const response = await fetch(uri, {
                method: "POST",
                headers: {
                    "Content-type": "multipart/form-data",
                },
                body: formData,
            })

            setDoneButton("Update ✅");
            // console.log(res.data);
            if (response.status === 200) {
                // console.log("hello");
                alert("Profile Updated Successfully");
                navigation.navigate("Login");
                return;
            }
            else if (response.status !== 200) {
                alert("Error updating try again.")
                navigation.navigate("Signup");
                return;
            }


            setProfileImage(null);
            setBio("");
            setLocation("");
            setRelationshipStatus(null);
            setProfession("");
            setDateofbirth("")
        } catch (error) {
            console.log(error);
        }
    };


    // console.log(gender);


    return (
        <ScrollView style={style.container}>

            <View style={style.login}>


                <Text style={{ width: "70%", color: "#ffffff", textAlign: "center", fontSize: 40, marginBottom: 40 }}>Complete your profile.</Text>
                <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 20 }} >
                    <Image source={profileImage === null ? require("../../image/profile/demoprofile.jpg") : { uri: `${profileImage}` }} resizeMode="cover" style={{ height: 120, width: 120, borderRadius: 100, }} />
                    <TouchableOpacity onPress={chhoseImage} >
                        <View style={{ backgroundColor: "#0F7FFF", width: 150, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 7, marginVertical: 5 }} ><Text style={{ color: "#ffffff" }} >Choose Image</Text></View>
                    </TouchableOpacity>
                </View>

                <TextInput placeholder="Enter home location" style={style.textInput} placeholderTextColor="#ffffff" onChangeText={setLocation} value={location} />
                <TextInput placeholder="Enter bio (max 40 character)" style={style.textInput} placeholderTextColor="#ffffff" onChangeText={setBio} value={bio} />
                <TextInput placeholder="Enter work.What do you do?" style={style.textInput} placeholderTextColor="#ffffff" onChangeText={setProfession} value={profession} />
                <Text style={{ width: "70%", color: "#bfbfbf", textAlign: "left", marginTop: 20 }}>Enter date of birth.</Text>
                <TextInput placeholder="Enter date of birth in DD/MM/YYYY" keyboardType="name-phone-pad" style={style.textInput} placeholderTextColor="#ffffff" onChangeText={setDateofbirth} value={dateofbirth} />

                <Text style={{ width: "70%", color: "#bfbfbf", textAlign: "left", marginTop: 20 }}>Choose your gender.</Text>
                <View style={{ borderColor: "#337aff", borderWidth: 1, width: "70%", borderRadius: 10, marginTop: 5 }} >

                    <Picker style={{ height: 40, width: "100%", color: "#ffffff", backgroundColor: "#ffffff", }}

                        selectedValue={gender}
                        onValueChange={(itemValue, itemIndex) =>
                            setGender(itemValue)
                        }>
                        <Picker.Item label="Select" value={null} />
                        <Picker.Item label="Male 👨" value="male" />
                        <Picker.Item label="Female 👧" value="female" />
                        <Picker.Item label="Other" value="other" />

                    </Picker>
                </View>
                <Text style={{ width: "70%", color: "#bfbfbf", textAlign: "left", marginTop: 20 }}>Choose relationship status.</Text>
                <View style={{ borderColor: "#337aff", borderWidth: 1, width: "70%", borderRadius: 10, marginTop: 5, marginBottom: 10 }} >

                    <Picker style={{ height: 40, width: "100%", color: "#ffffff", backgroundColor: "#ffffff", }}

                        selectedValue={relationshipStatus}
                        onValueChange={(itemValue, itemIndex) =>
                            setRelationshipStatus(itemValue)
                        }>
                        <Picker.Item label="Select" value={null} />
                        <Picker.Item label="Single 🙅" value="Single" />
                        <Picker.Item label="Married 💑" value="Married" />
                        <Picker.Item label="Other 😀" value="Friend zoned" />

                    </Picker>
                </View>




                <TouchableOpacity onPress={handleSubmit} style={{ marginBottom: 70 }}>
                    <View style={{ backgroundColor: "#0F7FFF", width: 150, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 7, marginVertical: 5 }} ><Text style={{ color: "#ffffff" }} >{doneButton}</Text></View>
                </TouchableOpacity>
            </View>




        </ScrollView>

    )
}



const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141414",
        // height: Dimensions.get("screen").height
        height: "100%"
        // paddingTop: 10
    },
    login: {


        alignItems: "center",
        // justifyContent: "center"
        top: 50,

    },
    textInput: {
        borderColor: "#337aff",
        height: 40,
        width: "70%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        color: "#ffffff",
        backgroundColor: "#4f4f4f"

    },
    image: {
        width: 200,
        height: 200,
        resizeMode: "center",
        margin: 20,
    },
    button: {
        padding: 12,
        backgroundColor: "#337aff",
        width: 180,
        textAlign: "center",
        borderRadius: 7,
        marginTop: 30,
        fontWeight: "600",
        fontSize: 17

    }



})





export default CompleteProfile
