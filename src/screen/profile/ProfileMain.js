import React, { useEffect, useState } from 'react'
import { Button, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Timeline from '../../component/profile/Timeline';
import Post from '../../component/profile/Post';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileMain = ({ navigation }) => {

    const [userData, setUserData] = useState(null)
    const [profileitems, setProfileitems] = useState(null)
    const [timelineIcons, setTimelineIcons] = useState("timeline-outline")
    const [postIcons, setPostIcons] = useState("image-outline")
    const [tagIcons, setTagIcons] = useState("tag-heart-outline")

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

    return (
        <View style={{ flex: 1 }}>


            <ImageBackground source={require("../../image/profile/profilebg.jpg")} resizeMode="cover" style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ backgroundColor: "#44444459" }}>

                        <ImageBackground source={userData === null ? require("../../image/profile/profilebg.jpg") : { uri: `${userData.coverPicture}` }} resizeMode="cover" style={{ width: "100%", paddingVertical: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: "100%", }}>

                                <View style={{ padding: 15, borderWidth: 6, borderColor: "#009affd6", borderRadius: 120, }} >

                                    <Image source={userData === null ? require("../../image/profile/profilebg.jpg") : { uri: `${userData.profilePicture}` }} resizeMode="cover" style={{ height: 100, width: 100, borderRadius: 50, }} />
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "50%" }} >
                                    <View  >
                                        <Text style={styles.profileStat}>{userData !== null ? userData.following : ""}</Text>
                                        <Text style={styles.profileStatText}>following</Text>
                                    </View>
                                    <View >
                                        <Text style={styles.profileStat}>{userData !== null ? userData.followers : ""}</Text>
                                        <Text style={styles.profileStatText}>followers</Text>
                                    </View>
                                    <View >
                                        <Text style={styles.profileStat}>{userData !== null ? userData.post : ""}</Text>
                                        <Text style={styles.profileStatText}>Post</Text>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                        <Text style={styles.text}>{userData !== null ? userData.profileName : ""}</Text>
                        <Text style={styles.textmini}>{userData !== null ? userData.bio : ""}</Text>

                        <TouchableOpacity onPress={() => { navigation.navigate("EditProfile") }} style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 20, marginTop: 20 }} >
                            <View style={{ backgroundColor: "#000fff", width: 150, height: 40, flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10 }} ><Text>Edit Profile</Text></View>
                        </TouchableOpacity>
                    </View>
                    {userData !== null &&

                        <View style={{ flex: 1, height: 40, backgroundColor: "#37454999", flexDirection: "row", width: "100%", justifyContent: "space-around", alignItems: "center" }}>


                            <TouchableOpacity onPress={() => {
                                setProfileitems(<Timeline userid={userData._id} />)
                            }}>

                                <Image source={require("../../image/profile/timeline.png")} style={styles.logoimg} />

                            </TouchableOpacity>




                            <TouchableOpacity onPress={() => {
                                setProfileitems(<Post />)
                            }} >

                                <Image source={require("../../image/profile/post.png")} style={styles.logoimg} />
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
})
