import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Share } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';


const PostLayout = (props) => {
    const [count, setCount] = useState(0);
    const [api, setApi] = useState(null)
    const [user, setUser] = useState(null)
    const [commentbox, setCommentbox] = useState(false)
    const [commentText, setCommentText] = useState("");
    const [addComment, setAddComment] = useState(null)
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


    const commentfn = async (userid, postid) => {
        if (userid === null || postid === null || user._id === null) {
            alert("Please login to comment");
            return;
        }
        try {
            const url = "http://metaaa.herokuapp.com/userintraction/comment";

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
                alert("Something went wrong 😣");
                return;
            }
            else if (response.status === 200) {
                setAddComment(commentText);
            }

            // const data = await response.json();

            // console.log(data.message);
            setCommentbox(false);
            setCommentText("");
        } catch (err) {
            // console.log(err);
        }
    };

    // #000000ed

    const onShare = async (name) => {
        try {
            const result = await Share.share({
                message:
                    `Find me on meta verse.Install the app and serach for ${name} `,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    console.log(user);
    return (

        <View  >

            {api === undefined || api === null || api.post === undefined || api.post === null || api.post.postUri === undefined ? <View></View>

                :

                <View style={{
                    height: "100%", flex: 1, backgroundColor: "#e1e1e1", marginHorizontal: 3, marginVertical: 1, borderRadius: 5, shadowOffset: { width: 5, height: 3 },
                    shadowColor: "#ffffff",
                    shadowOpacity: 0.5,
                    elevation: 5, marginBottom: 10
                }}>
                    <View style={{ flexDirection: "row", padding: 7, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>

                        <Image source={api === null ? require("../../image/profile/profilebg.jpg") : { uri: `${api.profileimg}` }} resizeMode="cover" style={{ height: 40, width: 40, borderRadius: 50, marginHorizontal: 5 }} />
                        <View style={{ flexDirection: "column", flex: 1, marginHorizontal: 5, justifyContent: "center" }}>
                            <Text style={{ color: "#000000", fontSize: 15 }}>
                                {api !== null ? api.profilename : ""}
                            </Text>
                            <Text style={{ color: "#000000" }}>
                                {api.post.location !== undefined ? api.post.location : ""}
                            </Text>
                        </View>

                    </View>
                    <View style={{ width: "100%" }}>
                        <Image source={api.post === null ? require("../../image/profile/profilebg.jpg") : { uri: `${api.post.postUri}` }} resizeMode="contain" style={{ height: 270, width: "100%", backgroundColor: "#000000" }} />
                    </View>
                    <View style={{ width: "100%", alignItems: "center", justifyContent: "space-around", flexDirection: "row", marginVertical: 10 }}>
                        <TouchableOpacity onPress={() => { likedfn(props.mainid, props.postid) }}>
                            <Image source={require("../../image/post/like.png")} resizeMode="cover" style={{ height: 30, width: 30 }} />

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            commentbox ? setCommentbox(false) : setCommentbox(true)
                        }} >

                            <Image source={require("../../image/post/comment.png")} resizeMode="cover" style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { onShare(api.profilename) }} >

                            <Image source={require("../../image/post/share.png")} resizeMode="cover" style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>
                    {commentbox ?
                        <View style={{ height: "100%" }} >
                            <TextInput placeholder="Type commments..." onChangeText={setCommentText} style={{ height: 70, backgroundColor: "#ffffff", paddingHorizontal: 5 }} />
                            <TouchableOpacity onPress={() => { commentfn(props.mainid, props.postid) }} style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#009affd6", height: 50 }} >

                                <Text style={{ color: "#000000" }} >Comment</Text>
                            </TouchableOpacity>

                        </View> :
                        <View>

                            <Text style={{ color: "#000000", marginVertical: 4, marginHorizontal: 5 }}>


                                👍Liked by {" "}
                                {api.post !== null && api.post.liked[0]
                                    ? api.post.liked[0].name + " and"
                                    : ""}{" "}

                                {api.post !== null && api.post.liked.length > 0
                                    ? api.post.liked.length - 1 + count
                                    : 0 + count}  other

                            </Text>
                            <Text style={{ color: "#000000", marginHorizontal: 5, marginBottom: 5, fontSize: 15 }}>{api.profilename}- {api.post.postCaption}</Text>
                            {addComment === null ?

                                <Text style={{ color: "#000000", marginHorizontal: 5, marginBottom: 10 }}> {api.post.postComments !== null && api.post.postComments.length > 0 ? api.post.postComments[0].name + "commented" : ""} {" "} {api.post.postComments !== null && api.post.postComments.length > 0 ? api.post.postComments[0].comments : ""}</Text>
                                : <Text style={{ color: "#000000", marginHorizontal: 5, marginBottom: 10 }}> {user.profileName + "  " + "  commented  " + addComment}</Text>}
                            <Text style={{ color: "#000000", marginHorizontal: 5, marginBottom: 10 }}>{api.post.postDate}</Text>
                        </View>}


                </View>
            }
        </View>
    )
}

export default PostLayout

// onPress={() => { commentfn(props.mainid, props.postid) }}