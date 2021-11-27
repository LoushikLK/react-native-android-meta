import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import PostLayout from '../../screen/post/PostLayout'


const Timeline = (props) => {
    const [timelinedata, setTimelinedata] = useState([]);

    useEffect(() => {
        const getprofiledata = async () => {
            try {
                const url = "http://metaaa.herokuapp.com/profilefeed/timeline";

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
                if (response.status === 200) {
                    setTimelinedata(data.message);
                }
            } catch (err) {
                // console.log(err);
            }
        };
        getprofiledata();
        return () => {
            setTimelinedata([]);
        };
    }, [props.userid]);

    // console.log(timelinedata);

    return (


        <View>

            {timelinedata.length > 0
                ? timelinedata.map((value, index) => {
                    return (
                        <PostLayout mainid={value.userid} postid={value.postid} key={index} />
                    );
                })
                : <Text>You Haven't posted yet.</Text>}
        </View>

    )
}

export default Timeline
