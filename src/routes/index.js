import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Keyboard } from "react-native"; // Certifique-se de que o ScrollView e o Keyboard estão importados

//PAGES
import Home from "../pages/home";
import Plans from "../pages/plans";

//COMPONENTS
import Header from "../components/header"; // Importe o Header

const Tab = createBottomTabNavigator();

export default function Routes() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#FFD700", // Cor do fundo da barra de navegação
          borderTopWidth: 0,
          height: keyboardVisible ? 0 : 60, // Esconde a barra quando o teclado está visível
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#333",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      >
        {/* Usar children para renderizar componentes diretamente */}
        {() => (
          <ScrollView style={{ flex: 1 }}>
            <Header />
            <Home />
          </ScrollView>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Planos"
        component={Plans} // Componente para a tela de Planos
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
