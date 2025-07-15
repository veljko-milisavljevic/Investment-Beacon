import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'

//Themed components
import ThemedView from '../components/ThemedView'
import ThemedLogo from '../components/ThemedLogo'
import ThemedText from '../components/ThemedText'
import Spacer from '../components/Spacer'

const About = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>O nama</ThemedText>
    </ThemedView>
  )
}

export default About

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