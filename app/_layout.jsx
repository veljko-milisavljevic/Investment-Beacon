import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import { Colors } from '../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { UserProvider } from '../contexts/UserContext'

const RootLayout = () => {

  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <UserProvider>
      <StatusBar style="auto" />  
      {/*<Stack>
          <Stack.Screen name="index" options={{ title:"Početna" }} />
          <Stack.Screen name="about" options={{ title:"O nama" }} /> //Opcija headerShow: false
          <Stack.Screen name="(auth)" options={{ headerShown: false }}
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      </Stack>*/}
      <Slot/>
        
    </UserProvider>
    
  )
}

export default RootLayout

const styles = StyleSheet.create({})