import React, { useEffect, useState, useCallback } from 'react'
import { Button, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, RefreshControl, TouchableOpacity, View } from 'react-native'
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Timeline from '../../component/profile/Timeline';
import Post from '../../component/profile/Post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { isLogin } from "../../store/actionCreator/index"
import * as SecureStore from 'expo-secure-store';


const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

const ProfileMain = ({ navigation }) => {

    const [userData, setUserData] = useState(null)
    const [profileitems, setProfileitems] = useState(null)
    const [timelineBackground, setTimelineBackground] = useState("#009affd6")
    const [postBackground, setPostBackground] = useState("#00000000")

    const [refreshing, setRefreshing] = useState(false);


    const dispatch = useDispatch()

    const onRefresh = useCallback(async () => {



        setRefreshing(true);
        let user = await AsyncStorage.getItem("userData")
        setUserData(JSON.parse(user))

        if (userData != null) {
            setProfileitems(<Timeline userid={userData._id} />)
        }


        wait(2000).then(() => setRefreshing(false));

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
        return () => {
            setUserData(null)
        }
    }, [])


    useEffect(() => {
        if (userData === null) {
            return
        }
        setProfileitems(<Timeline userid={userData._id} />)

        return () => {
            setProfileitems(null)
        }
    }, [userData])

    // console.log(userData);

    const logout = async () => {

        dispatch(isLogin({ isLogin: false }))
        try {
            await AsyncStorage.removeItem("userData")
            await SecureStore.deleteItemAsync('userCredential')

            navigation.navigate("Login")
        } catch (error) {
            alert("An error occoured")
            console.log(error);
        }

    }

    return (
        <View style={{ flex: 1 }}>


            <ImageBackground source={require("../../image/profile/profilebg.jpg")} resizeMode="cover" style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                    <View style={{ backgroundColor: "#44444459" }}>

                        <ImageBackground source={userData === null ? require("../../image/profile/profilebg.jpg") : { uri: `${userData.coverPicture}` }} resizeMode="cover" style={{ width: "100%", paddingVertical: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: "100%" }}>

                                <View style={{ padding: 15, borderWidth: 6, borderColor: "#009affd6", borderRadius: 120, }} >

                                    <Image source={userData === null ? require("../../image/profile/profilebg.jpg") : { uri: `${userData.profilePicture}` }} resizeMode="cover" style={{ height: 100, width: 100, borderRadius: 50, }} />
                                </View>
                                <TouchableOpacity onPress={logout} style={{ alignItems: "center", justifyContent: "center", marginBottom: 20, marginTop: 20 }} >
                                    <View style={{ backgroundColor: "#009affd6", width: 150, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 10 }} ><Text>Log Out</Text></View>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                            <Text style={styles.text}>{userData !== null ? userData.profileName : ""}</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("EditProfile") }} style={{ alignItems: "center", justifyContent: "center", marginBottom: 20, marginTop: 20, marginRight: 10 }} >
                                <View style={{ backgroundColor: "#009affd6", width: 150, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 10 }} ><Text>Edit Profile 🛠️ </Text></View>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.textmini}>{userData !== null ? userData.bio : ""}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "50%", marginTop: 20 }} >
                            <View  >
                                <Text style={styles.profileStat}>{userData !== null ? userData.following.length : ""}</Text>
                                <Text style={styles.profileStatText}>following</Text>
                            </View>
                            <View >
                                <Text style={styles.profileStat}>{userData !== null ? userData.followers.length : ""}</Text>
                                <Text style={styles.profileStatText}>followers</Text>
                            </View>
                            <View >
                                <Text style={styles.profileStat}>{userData !== null ? userData.post : ""}</Text>
                                <Text style={styles.profileStatText}>Post</Text>
                            </View>
                        </View>

                        {/* <TouchableOpacity onPress={() => { navigation.navigate("EditProfile") }} style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 20, marginTop: 20 }} >
                            <View style={{ backgroundColor: "#000fff", width: 150, height: 40, flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10 }} ><Text>Edit Profile</Text></View>
                        </TouchableOpacity> */}
                        {userData !== null &&
                            <View style={{ margin: 20 }}>
                                {userData.about.location !== null &&

                                    <View style={styles.abouticons}>
                                        <FontAwesome name="home" size={24} color="#000000" style={styles.abouticonsIcons} />
                                        <Text style={styles.textmini}>{userData.about.location}</Text>
                                    </View>
                                }
                                {userData.about.profession !== null &&

                                    <View style={styles.abouticons}>
                                        <MaterialIcons name="work" size={24} color="#000000" style={styles.abouticonsIcons} />
                                        <Text style={styles.textmini}>{userData.about.profession}</Text>

                                    </View>
                                }
                                {userData.about.relationshipStatus !== null &&

                                    <View style={styles.abouticons}>
                                        <Ionicons name="people" size={24} color="#000000" style={styles.abouticonsIcons} />
                                        <Text style={styles.textmini}>{userData.about.relationshipStatus}</Text>

                                    </View>
                                }
                            </View>}
                    </View>
                    {userData !== null &&

                        <View style={{ flex: 1, height: 40, backgroundColor: "#37454999", flexDirection: "row", width: "100%", justifyContent: "space-around", alignItems: "center" }}>


                            <TouchableOpacity style={{ backgroundColor: timelineBackground, width: "50%", }} onPress={() => {
                                setProfileitems(<Timeline userid={userData._id} />)
                                setTimelineBackground("#009affd6")
                                setPostBackground(null)
                            }}>

                                {/* <Image source={require("../../image/profile/timeline.png")} style={styles.logoimg} /> */}
                                <Text style={{ color: "#ffffff", height: "100%", textAlign: "center", textAlignVertical: "center" }}>Timeline</Text>

                            </TouchableOpacity>




                            <TouchableOpacity style={{ backgroundColor: postBackground, width: "50%" }} onPress={() => {
                                setProfileitems(<Post userid={userData._id} />)
                                setPostBackground("#009affd6")
                                setTimelineBackground(null)

                            }} >
                                <Text style={{ color: "#ffffff", height: "100%", textAlign: "center", textAlignVertical: "center" }}>Post</Text>

                                {/* <Image source={require("../../image/profile/post.png")} style={styles.logoimg} /> */}
                            </TouchableOpacity>




                        </View>}
                    {profileitems}
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

export default ProfileMain

const styles = StyleSheet.create({
    text: { color: "#ffffff", fontSize: 22, marginHorizontal: 20, marginVertical: 10 },
    textmini: {
        fontSize: 15,
        color: "#ffffff",
        textAlign: "left",
        marginHorizontal: 20,
    },
    profileStat: {
        textAlign: "center",
        color: "#ffffff",
        fontSize: 15

    },
    profileStatText: {
        color: "#ffffff",
        textAlign: "center",
        fontSize: 12
    },
    logoimg: {
        width: 25,
        height: 25
    }
    ,
    abouticons: {
        flexDirection: "row",
        alignItems: "center",
    },
    abouticonsIcons: {
        margin: 5,
        color: "#919191"
    }
})
