import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { View, StyleSheet } from "react-native";
import { ToastProvider } from 'react-native-toast-notifications'; // Importe o ToastProvider

export default function App() {
  return (

    <ToastProvider
    placement="top" // Coloca o Toast no topo
    duration={3000} // Tempo que o Toast vai ficar visível
  >
    <NavigationContainer>
  
      <ToastProvider
      placement="top"
      duration={3000} />

      <View style={styles.container}>
        <Routes />
      </View>
    </NavigationContainer>

    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD700", // Cor de fundo global
  },
});
