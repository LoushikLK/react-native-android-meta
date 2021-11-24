

import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Postlayout from '../post/PostLayout'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const [api, setApi] = useState([])

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const user = async () => {
            try {
                let data = await AsyncStorage.getItem("userData")
                setUserData(JSON.parse(data))
            } catch (error) {
                alert("An error occoured")
            }

        }
        user()
    }, [])

    // console.log(userData);


    useEffect(() => {
        const getapidata = async () => {
            if (userData === null) {
                return
            }
            try {
                let url = "http://metaaa.herokuapp.com/homefeed";

                let option = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        userid: userData._id,
                    },
                };
                const response = await fetch(url, option);

                const data = await response.json();
                // console.log(data);

                if (response.status === 200) {
                    setApi(data.message);
                }
            } catch (error) {
                // console.log(error);
                alert(error)
            }
        };

        getapidata();
        return () => {

            setApi([]);
        };
    }, [userData]);

    // console.log(api);
    return (
        <ScrollView>
            {api &&

                <View>
                    {api.length > 0 && api.map((value, i) => {
                        return (

                            <Postlayout key={i} postid={value.postid}
                                mainid={value.mainid} />
                        )
                    })}


                </View>
            }


        </ScrollView>
    )

}

export default HomeScreen






