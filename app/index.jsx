import { StyleSheet, Text, View, Image, useColorScheme } from 'react-native'
import { Link, Redirect } from 'expo-router'
import { Colors } from '../constants/Colors'

//Themed components
import ThemedView from '../components/ThemedView'
import ThemedLogo from '../components/ThemedLogo'
import ThemedText from '../components/ThemedText'
import Spacer from '../components/Spacer'

const Home = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    
  return (
    <Redirect href="/profile"/>
    /*ThemedView style={styles.container}>
        <ThemedLogo style={styles.img}/>

        <ThemedText title = {true} style = {styles.title}>Početna strana</ThemedText>

        <Spacer/>
        <Link href="/about"><ThemedText>O nama</ThemedText></Link>
        <Spacer/>
        <Link href="/login"><ThemedText>Prijavi se</ThemedText></Link>
        <Spacer/>
        <Link href="/register"><ThemedText>Napravi nalog</ThemedText></Link>
        <Spacer/>
        <Link href="/profile"><ThemedText>Moj profil</ThemedText></Link>
        
    </ThemedView>*/
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
})