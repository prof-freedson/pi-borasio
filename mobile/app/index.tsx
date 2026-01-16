// snippet para criar um componente RN como function default
// rnf
import "../global.css";
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold  text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Text className="text-4xl font-bold text-orange-700">
        Testando estilos usando o Nativewind!
      </Text>
    </View>
  );
}
