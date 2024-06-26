import { useState } from "react";
import axiosInstance from "../server/axios";
import { useSession } from "../../auth/ctx";
import BottomBar from "../components/BottomBar";
import { View, Text, Image } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useLocalSearchParams } from "expo-router";
import { Button, TextInput, ActivityIndicator, MD2Colors } from "react-native-paper";

export default function EmailChangeVerification(){
    
    const { signOut } = useSession();

    const {newEmail} = useLocalSearchParams();

    const [code, setCode] = useState("")

    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)

    const sendEmailCode = async() =>{
        setLoading(true)
        try{
            const token = await SecureStore.getItemAsync('session');
            await axiosInstance.post("/api/users/sendCodeNewEmail", {email: newEmail},{
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then((response) => {
                console.log(response)
                alert("Código enviado com sucesso! Verifique seu email!")
            }).catch((error) => {
                console.log(error)
                alert("Erro ao enviar código!")
            })
        } catch(error){
            alert("Erro ao enviar código!")
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    const activateAccount = async() =>{
        setLoading2(true)
        try{
            const token = await SecureStore.getItemAsync('session');
            await axiosInstance.post("/api/users/activateNewEmail", {email: newEmail, code: code},{
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then((response) => {
                if(response.status == 200){
                    alert("Conta ativada com sucesso!")
                    signOut()
                } else {
                    alert("Erro ao validar e-mail!")
                }
            }).catch((error) => {
                alert("Erro ao validar e-mail!")
            })
        } catch(error){
            alert("Erro ao validar conta!")
            console.log(error)
        }
        finally{
            setLoading2(false)
        }
    }


    return(
        <View className="h-full bg-white flex justify-center items-center">
            <Image className="w-20 h-20" source={require("../../public/icons/emailSendPng.png")}></Image>
            <Text>Verifique seu email: <Text className="text-purple-700">{newEmail}</Text></Text>
            <Text className="mt-2">Insira o <Text className="text-green-500">código</Text> recebido abaixo</Text>
            <TextInput className="w-60 my-4" maxLength={6} label="Código" mode="outlined" value={code} onChangeText={setCode} />
            {
            loading 
            ? 
            <ActivityIndicator animating={true} color={MD2Colors.green500} size={40}/> 
            : 
            <Button mode='contained' className="bg-green-500 w-60" onPress={sendEmailCode}>Enviar código</Button>
            }
            {loading2 
            ? 
            <ActivityIndicator className="mt-2" animating={true} color={MD2Colors.purpleA700} size={40}/> 
            : 
            <Button mode='contained' className="bg-purple-500 w-60 mt-2" onPress={activateAccount}>Verificar seu novo email!</Button>
            }
            <BottomBar screen="MenuScreen"></BottomBar>
        </View>
    )
}