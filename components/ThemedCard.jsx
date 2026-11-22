import { View, useColorScheme, StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'

const ThemedCard = ({style, ...props}) => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
  return (
    <View 
        style={[{backgroundColor:theme.uiCard}, styles.card, style]}
        {...props}
    />
  )
}

export default ThemedCard

const styles = StyleSheet.create({
    card: {
        borderRadius: 25,
        padding: 20,
        width: "90%"
    }
})