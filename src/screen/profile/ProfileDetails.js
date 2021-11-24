import React, { useEffect, useState } from 'react'
import { Button, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Timeline from '../../component/profile/Timeline';
import Post from '../../component/profile/Post';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileDetails = ({ route, navigation }) => {

    const [profileitems, setProfileitems] = useState(null)
    const [userDetails, setUserDetails] = useState(null)


    const name = route.params.name

    console.log(name);





    useEffect(() => {
        const getprofiledata = async () => {
            if (name === null) {
                return null;
            }
            try {
                const res = await fetch(`http://metaaa.herokuapp.com/getuser/${name}`);
                // console.log(res.data);
                const data = await res.json();
                if (res.status === 200) {
                    setUserDetails(data.message);
                    setProfileitems(<Timeline userid={data.message._id} />);
                } else if (res.status !== 200) {
                    navigation.navigate("SearchMain");
                }
            } catch (error) {
                console.log(error);
                navigation.navigate("Home");
            }
        };
        getprofiledata();
    }, [name]);

    // console.log(userData);

    return (
        <View style={{ flex: 1 }}>

            {userDetails !== null &&


                <ImageBackground source={require("../../image/profile/profilebg.jpg")} resizeMode="cover" style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ backgroundColor: "#44444459" }}>

                            <ImageBackground source={userDetails === null ? require("../../image/profile/profilebg.jpg") : { uri: `${userDetails.coverPicture}` }} resizeMode="cover" style={{ width: "100%", paddingVertical: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: "100%", }}>

                                    <View style={{ padding: 15, borderWidth: 6, borderColor: "#009affd6", borderRadius: 120, }} >

                                        <Image source={userDetails === null ? require("../../image/profile/profilebg.jpg") : { uri: `${userDetails.profilePicture}` }} resizeMode="cover" style={{ height: 100, width: 100, borderRadius: 50, }} />
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "50%" }} >
                                        <View  >
                                            <Text style={styles.profileStat}>{userDetails !== null ? userDetails.following : ""}</Text>
                                            <Text style={styles.profileStatText}>following</Text>
                                        </View>
                                        <View >
                                            <Text style={styles.profileStat}>{userDetails !== null ? userDetails.followers : ""}</Text>
                                            <Text style={styles.profileStatText}>followers</Text>
                                        </View>
                                        <View >
                                            <Text style={styles.profileStat}>{userDetails !== null ? userDetails.post : ""}</Text>
                                            <Text style={styles.profileStatText}>Post</Text>
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                            <Text style={styles.text}>{userDetails !== null ? userDetails.profileName : ""}</Text>
                            <Text style={styles.textmini}>{userDetails !== null ? userDetails.bio : ""}</Text>

                            <TouchableOpacity onPress={() => { navigation.navigate("EditProfile") }} style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 20, marginTop: 20 }} >
                                <View style={{ backgroundColor: "#000fff", width: 150, height: 40, flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10 }} ><Text>Follow</Text></View>
                            </TouchableOpacity>
                        </View>
                        {userDetails !== null &&

                            <View style={{ flex: 1, height: 40, backgroundColor: "#37454999", flexDirection: "row", width: "100%", justifyContent: "space-around", alignItems: "center" }}>


                                <TouchableOpacity onPress={() => {
                                    setProfileitems(<Timeline userid={userDetails._id} />)
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
                </ImageBackground>}
        </View>
    )
}

export default ProfileDetails

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
        color: "#b5b2b2",
        textAlign: "center",
        fontSize: 12
    },
    logoimg: {
        width: 25,
        height: 25
    }
})
