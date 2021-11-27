

import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, Dimensions, Image, RefreshControl } from 'react-native'
import Postlayout from '../post/PostLayout'
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};


const HomeScreen = () => {
    const [api, setApi] = useState([])

    const [userData, setUserData] = useState(null)
    const [homeLoading, setHomeLoading] = useState(true)

    const [refreshing, setRefreshing] = useState(false);






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

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        let user = await AsyncStorage.getItem("userData")
        setUserData(JSON.parse(user))
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
        setHomeLoading(false)
        if (response.status === 200) {
            setApi(data.message);
        }

        wait(2000).then(() => setRefreshing(false));
    }, []);
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
                setHomeLoading(false)
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

    const HomeLoading = () => {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", height: Dimensions.get("screen").height, backgroundColor: "#5e5c5c" }} >
                <Image source={require("../../image/loading.gif")} style={{ width: 100, height: 100 }} />
                {/* <Text style={{ fontSize: 20, marginTop: 10 }} >Fetching from server Wait...☁️☁️☁️</Text> */}
            </View>
        )
    }

    // console.log(api);
    return (

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
            <Text style={{ color: "#ffffff", backgroundColor: "#000000", textAlign: "center", fontSize: 17, paddingVertical: 20 }}>🎉WELOCOME {userData !== null ? userData.profileName : ""}🎉</Text>
            {homeLoading ? <HomeLoading /> :
                <View>

                    {api &&

                        <View style={{

                        }} >
                            {api.length > 0 && api.map((value, i) => {
                                return (

                                    <Postlayout key={i} postid={value.postid}
                                        mainid={value.mainid} />
                                )
                            })}


                        </View>
                    }
                    {api.length === 0 &&

                        <View style={{ flex: 1, height: Dimensions.get("window").height, justifyContent: "center", alignItems: "center", backgroundColor: "#34cfeb" }}  >

                            <Text style={{ textAlign: "center", fontSize: 22, color: "#ffffff" }} >Ohh so much empty here 😶</Text>
                            <Text style={{ textAlign: "center", fontSize: 22, color: "#ffffff" }} >Follow some people to see their post 😀</Text>
                        </View>
                    }
                </View>}

        </ScrollView>
    )

}

export default HomeScreen






