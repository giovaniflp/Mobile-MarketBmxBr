import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Link } from "expo-router"
import { router } from "expo-router";
import axiosInstance from "../server/axios";

export default function HomeAd({id} : {id: string}){

    const [adData, setAdData] = useState([])

    useEffect(() => {
        axiosInstance.get("/advertisement/" + id)
        .then((res) => {
            setAdData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    , [])
    
    return(
            <TouchableOpacity className="border-2 border-black w-40 h-52 bg-white rounded-lg justify-center items-center mx-2 my-2" onPress={()=>{
                router.push({
                    pathname: "/FullAdScreen/[id]",
                    params: {
                        id: adData.id
                    }
                })
            }}>
                <Image style={{resizeMode:"contain"}} className="w-full h-20" source={{uri:adData.imagem}}></Image>
                <Text className="text-center text-xs">{adData.categoria} {adData.marca} {adData.modelo}</Text>
                <Text className="text-center text-xs">R${adData.preco}</Text>
                <View className="flex flex-row gap-4">
                    <Text className="text-cente text-xs">{adData.localidade}</Text>
                    <Text className="text-cente text-xs">{adData.dataPostagem}</Text>
                </View>
            </TouchableOpacity>
    )
}