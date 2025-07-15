
import { StyleSheet, Text } from 'react-native'
import { useUser } from '../../hooks/useUser'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedButton from '../../components/ThemedButton'

const Profile = () => {

  const { logout, user } = useUser()

  return (
    <ThemedView style={styles.container} safe={true}>

      <ThemedText title={true} style={styles.heading}>
        Profil korisnika
      </ThemedText>
      {user && <ThemedText>Dobrodošao, {user.name}</ThemedText>}
      <Spacer />

      <ThemedText style={{ textAlign: "center" }}>Osnovne informacije o korisniku, ? kakav je investitor ?, mogućnost ponovnog popunjavanja upitnika</ThemedText>
      <Spacer />

      <ThemedButton onPress={logout}>
        <Text style={{ color: '#f2f2f2' }}>Odjavi me</Text>
      </ThemedButton>

    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
})
