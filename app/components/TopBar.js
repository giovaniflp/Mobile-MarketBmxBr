import { View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Link } from "expo-router"

export default function TopBar(){

    const changePage = useNavigation();

    return(
        <View className="bg-blue-600 p-4">
            <Link href="/HomeScreen" asChild>
                <TouchableOpacity>
                    <Image source={require('../../public/icons/arrowBackPNG.png')}></Image>
                </TouchableOpacity>
            </Link>
        </View>
    )
}