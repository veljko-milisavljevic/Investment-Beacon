import { View, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'



const ThemedView = ({ style, safe = false, ...props }) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const gradientColors = [
    theme.backgroundLight ?? '#ffffff', // top-left lighter
    theme.background ?? '#eeeeee'       // bottom-right darker
  ]

  if(safe){ //With padding on the sides, to prevent screen overflow
    const insets = useSafeAreaInsets()


    return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ backgroundColor: theme.background, 
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        
       }, style]}
      {...props}
    />
  )}
  else{
    return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ backgroundColor: theme.background }, style]}
      {...props}
    />
  )
  }
  
}

export default ThemedView