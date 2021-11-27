import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native'


const VerifyOtp = ({ navigation }) => {
    const [otp, setOtp] = useState("")
    const [loadingOtp, setLoadingOtp] = useState("VERIFY ✅")
    async function handleSubmit(e) {
        e.preventDefault();
        if (otp === "") {
            alert("Please enter OTP ❗");
        }
        try {
            setLoadingOtp("VERIFYING...⚙️⚙️")
            const url = "http://metaaa.herokuapp.com/usersignin/emailverification";
            const option = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otp,
                }),
            };

            // console.log(option.body);

            const response = await fetch(url, option);

            setLoadingOtp("VERIFY ✅")

            // const data = await response.json();

            // console.log(data);

            if (response.status === 200) {
                // console.log("response 200");
                navigation.navigate("CompleteProfile");
            }
            else {
                alert("Invalid OTP ❗");
            }
        } catch (error) { }
    }
    return (
        <ScrollView style={{ flex: 1 }}>



            <View style={style.container} >
                <View style={style.login}>


                    <Text style={{ width: "70%", color: "#ffffff", textAlign: "center", fontSize: 40 }}>VERIFY OTP</Text>
                    <Text style={{ width: "70%", color: "#bfbfbf", textAlign: "center", marginBottom: 40 }}>Please check your email for the OTP.</Text>


                    <TextInput placeholder="Enter OTP" style={style.textInput} placeholderTextColor="#ffffff" onChangeText={setOtp} value={otp} />



                    <TouchableOpacity onPress={handleSubmit}>

                        <Text style={style.button}>
                            {loadingOtp}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>



        </ScrollView>

    )
}
export default VerifyOtp

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141414",
        height: Dimensions.get("screen").height
        // paddingTop: 10
    },
    login: {

        flex: 1,
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


