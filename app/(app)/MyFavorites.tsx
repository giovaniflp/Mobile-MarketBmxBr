import { router } from "expo-router";
import axiosInstance from "../server/axios";
import { useState, useEffect } from "react";
import BottomBar from "../components/BottomBar"
import * as SecureStore from 'expo-secure-store'
import FavoriteAd from "../components/FavoriteAd";
import { ActivityIndicator, MD2Colors  } from "react-native-paper";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"

export default function MyFavorites(){

    const [favorites, setFavorites] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        JwtDecode()
    }, [])

    const JwtDecode = async () => {
        try{
            const token = await SecureStore.getItemAsync('session');
            const config = {
                headers: {
                Authorization: "Bearer " + token
                }
            }
            await axiosInstance.get("/api/token/jwtDecode", config).then(async(response) => {
                FetchFavorites(response.data.jti)
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    const FetchFavorites = async (responseData) => {
        setLoading(true)
        try{
            const token = await SecureStore.getItemAsync('session');
            const config = {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
            await axiosInstance.get("/api/favorites/user/" + responseData, config).then(async(response) => {
                setFavorites(response.data)
                console.log(response.data)
            })
        
        }
        catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    const removeFavorite = async (idAnuncio) => {
        try{
            const token = await SecureStore.getItemAsync('session');
            const config = {
            headers: {
                Authorization: "Bearer " + token
            }
            }
            await axiosInstance.delete("/api/favorites/delete/" + idAnuncio, config).then(async(response) => {
                alert("Anúncio removido dos favoritos!")
                JwtDecode()
            })
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <View className="h-full pt-12 bg-white">
            {loading && <ActivityIndicator className="absolute top-0 left-0 right-0 bottom-0" animating={true} color={MD2Colors.purpleA700} size={50}></ActivityIndicator>}
            <View className="flex flex-row items-center">
                <Text className="text-3xl m-1">Meus favoritos</Text>
                <Image className="w-8 h-8" source={require("../../public/icons/favoriteFullPNG.png")}></Image>
            </View>
            <View>
                <ScrollView className="mb-28" showsVerticalScrollIndicator={false}>
                    <View>
                    {favorites.length == 0 && <Text className="text-center text-2xl mt-20">Você ainda não tem favoritos.</Text>}
                    {favorites.map((favorite, index) => {
                        return (
                            <TouchableOpacity key={favorite.idAnuncio} onPress={()=>{
                                router.push({
                                    pathname: "/FullAdScreen/[id]",
                                    params: {
                                        id: favorite.idAnuncio
                                    }
                                })
                            }}>
                            <FavoriteAd id={favorite.idAnuncio}></FavoriteAd>
                            <View className="absolute right-4 top-16">
                                <TouchableOpacity onPress={()=>removeFavorite(favorite.idAnuncio)}>
                                    <Image className="w-10 h-10" source={require('../../public/icons/deletePng.png')}></Image>
                                </TouchableOpacity>
                            </View>
                            </TouchableOpacity>
                                )
                                })}
                    </View>
                </ScrollView>
            </View>
            <BottomBar screen="MenuScreen"></BottomBar>
        </View>
    )
}