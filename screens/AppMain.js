import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';


export default function AppMain() {

  const changePage = useNavigation();

  return (
    <View className="flex h-full mt-8 p-4">
      <View>
        <View>
          <Text>Lojas Verificadas</Text>
        </View>
        <View>
          <Text>Peças Novas</Text>
        </View>
        <View>
          <Text>Peças Usadas</Text>
        </View>
      </View>
      <View className="absolute bottom-0 left-0 right-0 h-20 flex flex-row justify-center border-t-2">
        <TouchableOpacity className="flex items-center mx-4">
          <Image source={require('../public/icons/homePNG.png')}></Image>
          <Text>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center mx-4">
          <Image source={require('../public/icons/categoryPNG.png')}></Image>
          <Text>Categorias</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center mx-4" onPress={()=>changePage.navigate('SearchScreen')}>
          <Image source={require('../public/icons/searchPNG.png')}></Image>
          <Text>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center mx-4">
          <Image source={require('../public/icons/menuPNG.png')}></Image>
          <Text>Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}