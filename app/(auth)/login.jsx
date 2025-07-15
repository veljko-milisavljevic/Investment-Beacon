import { StyleSheet, Text, Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Colors'
import { useState } from 'react'
import { useUser } from '../../hooks/useUser'

//Themed components
import ThemedView from '../../components/ThemedView'
import ThemedLogo from '../../components/ThemedLogo'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput'
import Spacer from '../../components/Spacer'


const login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(null)

    const {login} = useUser()

    const handleSubmit = async () => {
        setError(null)

        try {
            await login(email, password)
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container} safe={true}>

            <Spacer />
            <ThemedText title={true} style={styles.title}>
                Prijava
            </ThemedText>

            <ThemedTextInput
                style={{ marginBottom: 20, width: "80%" }}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <ThemedTextInput
                style={{ marginBottom: 20, width: "80%" }}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Spacer/>
            {error && <Text style={styles.error}>{error}</Text>}

            <ThemedButton onPress={handleSubmit}>
                <Text style={{ color: '#f2f2f2' }}>Prijavi me</Text>
            </ThemedButton>

            <Spacer height={20} />
            <Link href="/register">
                <ThemedText style={{ textAlign: 'center' }}>
                    Registruj se
                </ThemedText>
            </Link>
        </ThemedView>
        </TouchableWithoutFeedback>
    )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 30
    },
    error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: '#f5c1c8',
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  }
})