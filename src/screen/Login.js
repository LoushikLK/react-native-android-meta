import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, Button, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';


const Login = ({ navigation }) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)





    // console.log(email + password);
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === null || password === null) {
            return alert('Please fill all the fields')
        }
        try {

            await SecureStore.setItemAsync("userCredential", JSON.stringify({ email, password }));
        } catch (error) {
            console.log(error)

        }
    }
    return (

        <ScrollView style={{ flex: 1 }}>



            <View style={style.container} >
                <View style={style.login}>
                    <Image source={require("../image/Login-Signup/meta-logo.png")} style={style.image} />

                    <Text style={{ width: "70%", color: "#ffffff", textAlign: "left", fontSize: 40 }}>Login</Text>
                    <Text style={{ width: "70%", color: "#bfbfbf", textAlign: "left", marginBottom: 40 }}>Please login to continue</Text>


                    <TextInput placeholder="Enter Your Email" style={style.textInput} placeholderTextColor="#ffffff" onChangeText={setEmail} value={email} />

                    <TextInput placeholder="Enter Your Password" style={style.textInput} placeholderTextColor="#ffffff" onChangeText={setPassword} value={password} />

                    <TouchableOpacity onPress={handleSubmit}>

                        <Text style={style.button}>
                            LOGIN
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>



        </ScrollView >

    )
}

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

export default Login
