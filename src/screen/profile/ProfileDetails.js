import React, { useEffect, useState } from 'react'
import { Button, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Timeline from '../../component/profile/Timeline';
import Post from '../../component/profile/Post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';




const ProfileDetails = ({ route, navigation }) => {

    const [profileitems, setProfileitems] = useState(null)
    const [userDetails, setUserDetails] = useState(null)
    const [timelineBackground, setTimelineBackground] = useState("#009affd6")
    const [postBackground, setPostBackground] = useState("#00000000")
    const [userData, setUserData] = useState(null)
    const [followbtn, setFollowbtn] = useState("Follow")


    const name = route.params.name

    // console.log(name);

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

    const handleFollow = async (name) => {
        // console.log(id);
        if (userData === null) {
            return
        }
        else if (userData.profileName === name) {
            alert("You can't follow yourself")
            return
        }

        try {

            if (followbtn === "Follow") {

                let url = `http://metaaa.herokuapp.com/userintraction/follow`;


                let option = {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        myname: userData.profileName,
                        interectname: name,
                    }),
                };

                const response = await fetch(url, option);

                const data = await response.json();

                if (response.status === 200) {

                    setFollowbtn("Following")
                }
            }
            else {
                let url = `http://metaaa.herokuapp.com/userintraction/unfollow`


                let option = {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        myname: userData.profileName,
                        interectname: name,
                    }),
                };

                const response = await fetch(url, option);

                const data = await response.json();

                if (response.status === 200) {

                    setFollowbtn("Follow")
                }

            }

        } catch (error) {
            console.log(error);


        }

        // console.log(data);
    };





    useEffect(() => {
        const getprofiledata = async () => {
            if (name === null) {
                return null;
            }
            try {
                const res = await fetch(`http://metaaa.herokuapp.com/getuser/${name}`);
                // console.log(res.data);
                const data = await res.json();
                // console.log(data);
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
        return () => {
            setUserDetails(null);
            setProfileitems(null);
        }
    }, [name]);

    useEffect(() => {
        if (userDetails === null) {
            return
        }
        else if (userDetails.profileName === userData.profileName) {
            setFollowbtn("You")
        }

        else {
            let myarray = userData.following.map((value) => { return value.name })

            // console.log(myarray);
            myarray.indexOf(userDetails.profileName) === -1 ? setFollowbtn("Follow") : setFollowbtn("Following")
        }

        return () => {
            setFollowbtn("Follow")
        }

    }, [userDetails, userData])

    // console.log(userDetails);

    return (

        <View style={{ flex: 1 }}>
            {userDetails !== null &&

                <ImageBackground source={require("../../image/profile/profilebg.jpg")} resizeMode="cover" style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ backgroundColor: "#44444459" }}>

                            <ImageBackground source={userDetails === null ? require("../../image/profile/profilebg.jpg") : { uri: `${userDetails.coverPicture}` }} resizeMode="cover" style={{ width: "100%", paddingVertical: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: "100%" }}>

                                    <View style={{ padding: 15, borderWidth: 6, borderColor: "#009affd6", borderRadius: 120, }} >

                                        <Image source={userDetails === null ? require("../../image/profile/profilebg.jpg") : { uri: `${userDetails.profilePicture}` }} resizeMode="cover" style={{ height: 100, width: 100, borderRadius: 50, }} />
                                    </View>
                                    <TouchableOpacity onPress={() => { handleFollow(userDetails.profileName) }} style={{ alignItems: "center", justifyContent: "center", marginBottom: 20, marginTop: 20 }} >
                                        <View style={{ backgroundColor: "#009affd6", width: 150, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 10 }} ><Text>{followbtn}</Text></View>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                            <Text style={styles.text}>{userDetails !== null ? userDetails.profileName : ""}</Text>
                            <Text style={styles.textmini}>{userDetails !== null ? userDetails.bio : ""}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "50%", marginTop: 20 }} >
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

                            {/* <TouchableOpacity onPress={() => { navigation.navigate("EditProfile") }} style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 20, marginTop: 20 }} >
                        <View style={{ backgroundColor: "#000fff", width: 150, height: 40, flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10 }} ><Text>Edit Profile</Text></View>
                    </TouchableOpacity> */}
                            {userDetails !== null &&

                                <View style={{ margin: 20 }}>
                                    {userDetails.about.location !== null &&

                                        <View style={styles.abouticons}>
                                            <FontAwesome name="home" size={24} color="#000000" style={styles.abouticonsIcons} />
                                            <Text style={styles.textmini}>{userDetails.about.location}</Text>
                                        </View>
                                    }
                                    {userDetails.about.profession !== null &&

                                        <View style={styles.abouticons}>
                                            <MaterialIcons name="work" size={24} color="#000000" style={styles.abouticonsIcons} />
                                            <Text style={styles.textmini}>{userDetails.about.profession}</Text>

                                        </View>
                                    }
                                    {userDetails.about.relationshipStatus !== null &&

                                        <View style={styles.abouticons}>
                                            <Ionicons name="people" size={24} color="#000000" style={styles.abouticonsIcons} />
                                            <Text style={styles.textmini}>{userDetails.about.relationshipStatus}</Text>

                                        </View>
                                    }
                                </View>}


                        </View>
                        {userDetails !== null &&

                            <View style={{ flex: 1, height: 40, backgroundColor: "#37454999", flexDirection: "row", width: "100%", justifyContent: "space-around", alignItems: "center" }}>


                                <TouchableOpacity style={{ backgroundColor: timelineBackground, width: "50%", }} onPress={() => {
                                    setProfileitems(<Timeline userid={userDetails._id} />)
                                    setTimelineBackground("#009affd6")
                                    setPostBackground(null)
                                }}>

                                    {/* <Image source={require("../../image/profile/timeline.png")} style={styles.logoimg} /> */}
                                    <Text style={{ color: "#ffffff", height: "100%", textAlign: "center", textAlignVertical: "center" }}>Timeline</Text>

                                </TouchableOpacity>




                                <TouchableOpacity style={{ backgroundColor: postBackground, width: "50%" }} onPress={() => {
                                    setProfileitems(<Post userid={userDetails._id} />)
                                    setPostBackground("#009affd6")
                                    setTimelineBackground(null)

                                }} >
                                    <Text style={{ color: "#ffffff", height: "100%", textAlign: "center", textAlignVertical: "center" }}>Post</Text>

                                    {/* <Image source={require("../../image/profile/post.png")} style={styles.logoimg} /> */}
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

