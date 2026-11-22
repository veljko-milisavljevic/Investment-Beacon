
import { StyleSheet, View, Button, Text, ScrollView, KeyboardAvoidingView } from 'react-native'
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"height"}
    >
    <ThemedView style={styles.container} safe={true}>

      <ThemedText title={true} style={styles.heading}>
        Chat bot
      </ThemedText>
      <Spacer />

      <ScrollView>
        {loading && <ThemedText>Molim Vas sačekajte...</ThemedText>}
        {error && <ThemedText style={{ color: 'red' }}>Error: {error.message}</ThemedText>}
        {response && <ThemedText>Savetnik: {response.completion}</ThemedText>}
      </ScrollView>
      
      <ThemedTextInput
        value={input}
        onChangeText={setInput}
        placeholder="Pitajte me šta Vas zanima..."
        style={{ marginBottom: 10 }}
      />

      <Button title="Send" onPress={() => sendPrompt(input)} disabled={loading} />



    </ThemedView>
    </KeyboardAvoidingView>
  )
}

export default News

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
})
