import { Text, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'

const ThemedText = ({style,reverse = false, title = false, ...props}) => {
    const colorScheme = useColorScheme()
    const themeBool = (Colors[colorScheme] == Colors.light) ^ reverse //True - Light; False - Dark
    const theme = themeBool ? Colors.light : Colors.dark
        

    const textColor = title ? theme.title : theme.text

  return (
    <Text 
        style={[{color:textColor}, style]}
        {...props}
    />
  )
}

export default ThemedText