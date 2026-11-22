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
    const [IPS, setIPS] = useState(Array(11).fill(''))
    const [points, setPoints] = useState(Array(11).fill(''))

    const [error, setError] = useState(null)

    const { register } = useUser()

    const handleSelect = (i, choiceChar, choicePoints) => {
        setIPS(prev => {
            const next = [...prev]
            next[i] = choiceChar
            return next
        })

        setPoints(prev => {
            const next = [...prev]
            next[i] = choicePoints
            return next
        })
    }

    const handleSubmit = async () => {
        setError(null)
        const ipsString = IPS.join('')
        let invType = 'Balansiran'
        
        try {
            const totalScore = points.reduce((sum, val) => sum + val, 0)
            console.log(points)
            console.log(totalScore)
            if(totalScore >= 25){
                console.log("Agresivan")
                invType = "Agresivan"
            } else if(totalScore >=15){
                console.log("Balansiran")
                invType = "Balansiran"
            } else {
                console.log("Konzervativan")
                invType = "Konzervativan"
            }

            await register(email, password, fullName, phoneNumber, ipsString, invType)
        } catch (e) {
            setError(e.message)
        }
    }

    const questions = [
        {
            prompt: '1. Koji je osnovni cilj vašeg investiranja?',
            choices: [
                { char: 'A', text: 'Očuvanje kapitala (minimalni rizik)', points: 0 },
                { char: 'B', text: 'Stabilni prihodi (npr. dividende)', points: 1 },
                { char: 'C', text: 'Umeren rast kapitala', points: 2 },
                { char: 'D', text: 'Maksimalni rast kapitala (spreman/spremna sam na veći rizik)', points: 3 },
            ],
        },
        {
            prompt: '2. Na koliko dugo planirate da investirate većinu svog kapitala?',
            choices: [
                { char: 'A', text: 'Kraće od 1 godine', points: 0 },
                { char: 'B', text: '1–3 godine', points: 1 },
                { char: 'C', text: '3–5 godina', points: 2 },
                { char: 'D', text: '5–10 godina', points: 3 },
                { char: 'E', text: 'Duže od 10 godina', points: 4 },
            ],
        },
        {
            prompt: '3. Koliko ste spremni da vaš portfolio privremeno izgubi vrednost tokom tržišnih padova?',
            choices: [
                { char: 'A', text: 'Ne želim nikakav pad', points: 0 },
                { char: 'B', text: 'Do 10% gubitka', points: 1 },
                { char: 'C', text: 'Do 20% gubitka', points: 2 },
                { char: 'D', text: 'Više od 20% gubitka', points: 3 },
            ],
        },
        {
            prompt: '4. Kako biste emocionalno reagovali na pad vrednosti portfolija od 20%?',
            choices: [
                { char: 'A', text: 'Veoma bih se uznemirio', points: 0 },
                { char: 'B', text: 'Bio bih zabrinut ali bih ostao investiran', points: 2 },
                { char: 'C', text: 'Ne bih se uznemirio', points: 3 },
            ],
        },
        {
            prompt: '5. Kakvo je vaše znanje i iskustvo u investiranju?',
            choices: [
                { char: 'A', text: 'Bez iskustva', points: 0 },
                { char: 'B', text: 'Malo iskustva', points: 1 },
                { char: 'C', text: 'Umereno iskustvo', points: 2 },
                { char: 'D', text: 'Iskusni investitor', points: 3 },
            ],
        },
        {
            prompt: '6. Koliki je vaš godišnji prihod?',
            choices: [
                { char: 'A', text: 'Manje od 6.000€', points: 0 },
                { char: 'B', text: '6.000 – 15.000€', points: 1 },
                { char: 'C', text: '15.000 – 30.000€', points: 2 },
                { char: 'D', text: 'Više od 30.000€', points: 3 },
            ],
        },
        {
            prompt: '7. Kolika je ukupna vrednost vaše imovine?',
            choices: [
                { char: 'A', text: 'Manje od 20.000€', points: 0 },
                { char: 'B', text: '20.000 – 50.000€', points: 1 },
                { char: 'C', text: '50.000 – 150.000€', points: 2 },
                { char: 'D', text: 'Više od 150.000€', points: 3 },
            ],
        },
        {
            prompt: '8. Koliki procenat vaše imovine planirate da investirate?',
            choices: [
                { char: 'A', text: 'Manje od 10%', points: 0 },
                { char: 'B', text: '10% – 25%', points: 1 },
                { char: 'C', text: '25% – 50%', points: 2 },
                { char: 'D', text: 'Više od 50%', points: 3 },
            ],
        },
        {
            prompt: '9. Da li očekujete da vam zatreba deo investiranog novca u naredne 1–3 godine?',
            choices: [
                { char: 'A', text: 'Sigurno da', points: 0 },
                { char: 'B', text: 'Možda, ali ne verovatno', points: 1 },
                { char: 'C', text: 'Ne, dugoročno investiranje', points: 3 },
            ],
        },
        {
            prompt: '10. Kako biste reagovali ako vaša investicija ostvari slabiji prinos od očekivanog?',
            choices: [
                { char: 'A', text: 'Odmah bih promenio strategiju', points: 0 },
                { char: 'B', text: 'Možda bih sačekao neko vreme', points: 1 },
                { char: 'C', text: 'Ostaću dosledan strategiji', points: 3 },
            ],
        },
        {
            prompt: '11. Koja je vaša investiciona preferencija?',
            choices: [
                { char: 'A', text: 'Sigurnost i stabilnost', points: 0 },
                { char: 'B', text: 'Ravnoteža rasta i rizika', points: 2 },
                { char: 'C', text: 'Visok rast uz veće oscilacije', points: 3 },
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
                                    onPress={() => handleSelect(i, choice.char, choice.points)}
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