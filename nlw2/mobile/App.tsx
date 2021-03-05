import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { Archivo_400Regular, Archivo_700Bold } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import { useFonts } from 'expo-font';

import AppStack from "./src/routes/AppStack";
import { Text } from 'react-native';

export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) return <Text>Carregando...</Text>;

  return (
    <>
       <AppStack />
       <StatusBar style="light" />
    </>
  );
}