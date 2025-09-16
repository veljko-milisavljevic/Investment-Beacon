
import { StyleSheet, View, Button, Text } from 'react-native'
import useChatbot from '../../hooks/useChatbot';
import React, { useState } from 'react';

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedTextInput from "../../components/ThemedTextInput";

const News = () => {

  const [input, setInput] = useState('');
  const { response, loading, error, sendPrompt } = useChatbot();

  return (
    <ThemedView style={styles.container} safe={true}>

      <ThemedText title={true} style={styles.heading}>
        Aktuelne vesti
      </ThemedText>
      <Spacer />

      <ThemedTextInput
        value={input}
        onChangeText={setInput}
        placeholder="Pitajte me šta Vas zanima..."
        style={{ marginBottom: 10 }}
      />

      <Button title="Send" onPress={() => sendPrompt(input)} disabled={loading} />
      {loading && <ThemedText>Molim Vas sačekajte...</ThemedText>}
      {error && <ThemedText style={{ color: 'red' }}>Error: {error.message}</ThemedText>}
      {response && <ThemedText>Savetnik: {response.completion}</ThemedText>}

    </ThemedView>
  )
}

export default News

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
