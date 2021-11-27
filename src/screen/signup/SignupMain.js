import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native'


const SignupMain = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [loadingSignup, setLoadingSignup] = useState("SIGNUP")
    const userValidate = RegExp(/^[a-zA-Z0-9_]+$/);
    const emailValidate = RegExp(
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    );

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === "" || password === "" || confirmPassword === "" || name === "") {
            return alert("Please fill all the fields 🙂")
        }

        else if (userValidate.test(name) === false) {
            alert("Username can only contain letters, numbers and underscore 🙂");
            return;
        } else if (emailValidate.test(email) === false) {
            alert("Please enter a valid email 🙂");
            return;
        } else if (password !== confirmPassword) {
            alert("Password and confirm password does not match 🚫");
            return;
        }
        try {
            setLoadingSignup("LOADING ... ☁️")
            const url = "http://metaaa.herokuapp.com/usersignin/signup";
            const option = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    username: name,
                    password,
                }),
            };

            console.log(option.body);

            const response = await fetch(url, option);

            const data = await response.json();

            // console.log(data);
            setLoadingSignup("SIGNUP")
            if (data.message !== undefined) {
                alert(data.message);
            }

            if (response.status === 200) {
                navigation.navigate("VerifyOtp");
            }
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setName("");

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <ScrollView style={{ flex: 1 }}>



            <View style={style.container} >
                <View style={style.login}>
                    <Image source={require("../../image/Login-Signup/meta-logo.png")} style={style.image} />

                    <Text style={{ width: "70%", color: "#ffffff", textAlign: "left", fontSize: 40 }}>Sign up</Text>
                    <Text style={{ width: "70%", color: "#bfbfbf", textAlign: "left" }}>Welcome 🤗</Text>
                    <Text style={{ width: "70%", color: "#bfbfbf", textAlign: "left", marginBottom: 40 }} >Create your account in few steps.</Text>

                    <Text style={{ width: "70%", color: "#bfbfbf", textAlign: "left", }} >User name</Text>
                    <TextInput keyboardType="email-address" placeholder="User name only contain Letter,number,_" style={style.textInput} placeholderTextColor="#ffffff" onChangeText={setName} value={name} />
                    <Text style={{ width: "70%", color: "#bfbfbf", textAlign: "left", }} >Email</Text>

                    <TextInput keyboardType="visible-password" placeholder="Enter Your Email" style={style.textInput} placeholderTextColor="#ffffff" onChangeText={setEmail} value={email} />
                    <Text style={{ width: "70%", color: "#bfbfbf", textAlign: "left", }} >Choose a Password</Text>

                    <TextInput placeholder="Enter Your Password" style={style.textInput} placeholderTextColor="#ffffff" onChangeText={setPassword} value={password} />
                    <Text style={{ width: "70%", color: "#bfbfbf", textAlign: "left", }} >Confirm password</Text>

                    <TextInput placeholder="Enter Your Password" style={style.textInput} placeholderTextColor="#ffffff" onChangeText={setConfirmPassword} value={confirmPassword} />

                    <TouchableOpacity onPress={handleSubmit}>

                        <Text style={style.button}>
                            {loadingSignup}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>



        </ScrollView>
    )
}

export default SignupMain

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
