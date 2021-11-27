

import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'

const Post = (props) => {
    const [postData, setPostData] = useState([])
    useEffect(() => {
        const getprofiledata = async () => {
            try {
                const url = "http://metaaa.herokuapp.com/profilefeed/card";

                let option = {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        userid: props.userid,
                    },
                };
                const response = await fetch(url, option);

                const data = await response.json();

                // console.log(data);

                setPostData(data.message);
            } catch (err) {
                // console.log(err);
            }
        };
        getprofiledata();
        return () => {
            setPostData([]);
        }
    }, [props.userid]);
    // console.log(postData);
    return (
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center", marginHorizontal: 5 }} >
            {postData.length > 0 && postData.map((item, index) => {
                return (

                    <Image source={{ uri: item }} resizeMode="cover" style={{ height: 90, width: 100, margin: 5 }} key={index} />
                )
            })}

        </View>
    )
}

export default Post
