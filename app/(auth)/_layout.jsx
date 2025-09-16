import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useUser } from '../../hooks/useUser'
import GuestOnly from '../../components/auth/GuestOnly'

const AuthLayout = () => {

  const { user } = useUser()


  return (
    <GuestOnly>
      <StatusBar style="auto" />
      {/*<Stack screenOptions={{headerShown: false, animation: none}}/>*/}
      <Slot />
    </GuestOnly>

  )
}

export default AuthLayout

const styles = StyleSheet.create({})