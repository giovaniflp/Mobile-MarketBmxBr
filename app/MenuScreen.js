import { View, Image, Text, TouchableOpacity } from "react-native";
import BottomBar from "./components/BottomBar";
import Button from "./components/Button";
import { Link } from "expo-router"

export default function MenuScreen(){
    return(
        <View className="flex items-center h-full mt-8">
            <TouchableOpacity>
                <Image className="w-40 h-40 mt-2" source={require('../public/icons/accCircle.png')}></Image>
            </TouchableOpacity>
            <Text className="text-4xl mt-4">Giovani Feitosa</Text>
            <View className="my-4">
                <Button route="HomePage" text="Alterar Nome" color="blue"></Button>
            </View>
            <View >
                <Button route="HomePage" text="Alterar Senha" color="blue"></Button>
            </View>
            <View className="my-4">
                <Button route="HomePage" text="Sair" color="red"></Button>
            </View>
            <BottomBar></BottomBar>
        </View>
    )
}