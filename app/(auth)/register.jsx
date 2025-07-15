import { StyleSheet, Text, Keyboard, TouchableWithoutFeedback, TextInput, View, ScrollView } from 'react-native'
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

const register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [IPS, setIPS] = useState(Array(12).fill(''))

    const [error, setError] = useState(null)

    const { register } = useUser()

    const handleSelect = (i, choiceChar) => {
        setIPS(prev => {
            const next = [...prev]
            next[i] = choiceChar
            return next
        })
    }

    const handleSubmit = async () => {
        setError(null)
        const ipsString = IPS.join('')
        try {
            await register(email, password, fullName, phoneNumber, ipsString)
        } catch (e) {
            setError(e.message)
        }
    }

    const questions = [
        {
            prompt: '1. Koji je osnovni cilj vašeg investiranja?',
            choices: [
                { char: 'A', text: 'Očuvanje kapitala (minimalni rizik)' },
                { char: 'B', text: 'Stabilni prihodi (npr. dividende)' },
                { char: 'C', text: 'Umeren rast kapitala' },
                { char: 'D', text: 'Maksimalni rast kapitala (spreman/spremna sam na veći rizik)' },
            ],
        },
        {
            prompt: '2. Na koliko dugo planirate da investirate većinu svog kapitala?',
            choices: [
                { char: 'A', text: 'Kraće od 1 godine' },
                { char: 'B', text: '1–3 godine' },
                { char: 'C', text: '3–5 godina' },
                { char: 'D', text: '5–10 godina' },
                { char: 'E', text: 'Duže od 10 godina' },
            ],
        },
        {
            prompt: '3. Koliko ste spremni da vaš portfolio privremeno izgubi vrednost tokom tržišnih padova?',
            choices: [
                { char: 'A', text: 'Ne želim nikakav pad' },
                { char: 'B', text: 'Do 10% gubitka' },
                { char: 'C', text: 'Do 20% gubitka' },
            ],
        },
    ]

    return (

        <ThemedView style={styles.container}>
            <Spacer />
            <ThemedText title={true} style={styles.title}>
                Registracija novih korisnika
            </ThemedText>

            <ScrollView style={{ maxHeight: '65%', }} keyboardShouldPersistTaps="never">
                <ThemedTextInput
                    style={{ marginBottom: 20, width: "100%" }}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <ThemedTextInput
                    style={{ marginBottom: 20, width: "100%" }}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <ThemedTextInput
                    style={{ marginBottom: 20, width: "100%" }}
                    placeholder="Ime"
                    value={fullName}
                    onChangeText={setName}
                />

                <ThemedTextInput
                    style={{ marginBottom: 20, width: "100%" }}
                    placeholder="Telefon    +381601234567"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />

                {/* --- IPS Questions --- */}
                {questions.map((q, i) => (
                    <View key={i} style={styles.questionBlock}>
                        <ThemedText>{q.prompt}</ThemedText>
                        <View style={styles.choicesContainer}>
                            {q.choices.map(choice => (
                                <ThemedButton
                                    key={choice.char}
                                    onPress={() => handleSelect(i, choice.char)}
                                    style={[
                                        IPS[i] === choice.char ? styles.selectedChoice : styles.choiceButton,
                                    ]}
                                >
                                    <Text style={styles.choiceText}>
                                        {choice.char}) {choice.text}
                                    </Text>
                                </ThemedButton>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
            <Spacer />
            {error && <Text style={styles.error}>{error}</Text>}

            <ThemedButton onPress={handleSubmit}>
                <Text style={{ color: '#f2f2f2' }}>Registruj me</Text>
            </ThemedButton>

            <Spacer height={20} />
            <Link href="/login">
                <ThemedText style={{ textAlign: 'center' }}>
                    Imaš nalog? Prijavi se
                </ThemedText>
            </Link>
        </ThemedView>
    )
}

export default register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 30
    },
    questionBlock: {
        marginBottom: 20,
        width: '90%',
    },
    choicesContainer: {
        marginTop: 8,
    },
    choiceButton: {
        marginVertical: 4,
        padding: 10,
    },
    selectedChoice: {
        backgroundColor: '#007AFF',  // highlight
    },
    choiceText: {
        color: '#fff',
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