import { View, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ThemedView = ({ style, safe = false, ...props }) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  if(safe){ //With padding on the sides, to prevent screen overflow
    const insets = useSafeAreaInsets()


    return (
    <View
      style={[{ backgroundColor: theme.background, 
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        
       }, style]}
      {...props}
    />
  )}
  else{
    return (
    <View
      style={[{ backgroundColor: theme.background }, style]}
      {...props}
    />
  )
  }
  
}

export default ThemedView