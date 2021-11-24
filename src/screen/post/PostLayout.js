import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'


const PostLayout = (props) => {
    const [count, setCount] = useState(0);
    const [api, setApi] = useState(null)
    const [user, setUser] = useState(null)

    // console.log(props);

    useEffect(() => {
        const user = async () => {
            try {
                let data = await AsyncStorage.getItem("userData")
                setUser(JSON.parse(data))

            } catch (error) {
                alert("An error occoured")
                console.log(error);
            }

        }
        user()
    }, [])

    useEffect(() => {
        const getapidata = async () => {
            try {
                if (props.postid === null && props.mainid === null) {
                    return;
                }
                const url = "http://metaaa.herokuapp.com/getpostdetails";

                const option = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        _id: props.mainid,
                        postid: props.postid,
                    }),
                };

                const response = await fetch(url, option);

                const data = await response.json();

                // console.log(data.message);

                if (response.status === 200) {
                    setApi(data.message);

                }
                else if (response.status !== 200) {
                    alert(response.status)
                }
            } catch (err) {
                console.log(err);
            }
        };
        getapidata();
        return () => {
            setApi([])
        }
    }, [props.postid, props.mainid]);

    // console.log(api);

    const likedfn = async (userid, postid) => {
        console.log("user liked " + postid);
        if (userid === null || postid === null || user._id === null) {

            return;
        }
        try {
            const url = "http://metaaa.herokuapp.com/userintraction/liked";

            const option = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    mainuser: user._id,
                },
                body: JSON.stringify({
                    userid: userid,
                    postid: postid,
                }),
            };

            const response = await fetch(url, option);

            // const data = await response.json();

            if (response.status === 200) {
                setCount(count + 1);
            }

            // console.log(data.message);
        } catch (err) {
            // console.log(err);
        }
    };

    const [commentText, setCommentText] = useState("");
    const [showmessageBox, setShowmessageBox] = useState(false);

    const commentfn = async (userid, postid) => {
        if (userid === null || postid === null || userDetails._id === null) {
            alert("Please login to comment");
            return;
        }
        try {
            const url = "/userintraction/comment";

            const option = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    mainuser: user._id,
                },
                body: JSON.stringify({
                    userid: userid,
                    postid: postid,
                    textcomment: commentText,
                }),
            };

            const response = await fetch(url, option);

            if (response.status !== 200) {
                alert("Something went wrong");
                return;
            }

            // const data = await response.json();

            // console.log(data.message);
            setShowmessageBox(false);
            setCommentText("");
        } catch (err) {
            // console.log(err);
        }
    };

    return (

        <View>

            {api === undefined || api === null || api.post === undefined || api.post === null || api.post.postUri === undefined ? <View></View>

                :

                <View style={{ height: "100%", flex: 1, backgroundColor: "#000000", marginHorizontal: 3, marginVertical: 1, borderRadius: 5, }}>
                    <View style={{ flexDirection: "row", padding: 7, backgroundColor: "#000000", borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>

                        <Image source={api === null ? require("../../image/profile/profilebg.jpg") : { uri: `${api.profileimg}` }} resizeMode="cover" style={{ height: 40, width: 40, borderRadius: 50, marginHorizontal: 5 }} />
                        <View style={{ flexDirection: "column", flex: 1, marginHorizontal: 5, justifyContent: "center" }}>
                            <Text style={{ color: "#ffffff", fontSize: 15 }}>
                                {api !== null ? api.profilename : ""}
                            </Text>
                            <Text style={{ color: "#cbcbcb" }}>
                                {api.post.location !== undefined ? api.post.location : ""}
                            </Text>
                        </View>

                    </View>
                    <View style={{ width: "100%" }}>
                        <Image source={api.post === null ? require("../../image/profile/profilebg.jpg") : { uri: `${api.post.postUri}` }} resizeMode="contain" style={{ height: 270, width: "100%", backgroundColor: "#ffffff" }} />
                    </View>
                    <View style={{ width: "100%", alignItems: "center", justifyContent: "space-around", flexDirection: "row", marginVertical: 10 }}>
                        <TouchableOpacity onPress={() => { likedfn(props.mainid, props.postid) }}>
                            <Image source={require("../../image/post/like.png")} resizeMode="cover" style={{ height: 30, width: 30 }} />

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { commentfn(props.mainid, props.postid) }} >

                            <Image source={require("../../image/post/comment.png")} resizeMode="cover" style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>

                            <Image source={require("../../image/post/share.png")} resizeMode="cover" style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <View>

                        <Text style={{ color: "#ffffff", marginVertical: 4, marginHorizontal: 5 }}>


                            Liked by {""}
                            {api.post !== null && api.post.liked[0]
                                ? api.post.liked[0].name
                                : ""}{" "}
                            and{" "}
                            {api.post !== null && api.post.liked.length > 0
                                ? api.post.liked.length - 1 + count
                                : 0}  other

                        </Text>
                        <Text style={{ color: "#ffffff", marginHorizontal: 5, marginBottom: 10 }}>{api.profilename} {api.post.postCaption}</Text>
                        <Text style={{ color: "#ffffff", marginHorizontal: 5, marginBottom: 10 }}>{api.post.postDate}</Text>
                    </View>


                </View>
            }
        </View>
    )
}

export default PostLayout
