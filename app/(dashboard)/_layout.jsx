import { Tabs } from "expo-router"
import { useColorScheme } from "react-native"
import { Colors } from "../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"

const DashboardLayout = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    return (
        <Tabs
            screenOptions={{
                headerShown: false, 
                tabBarStyle:{
                    backgroundColor: theme.navBackground,
                    paddingTop: 5,
                    height: 110,
                },
                tabBarActiveTintColor: theme.iconColorFocused,
                tabBarInactiveTintColor: theme.iconColor
            }}
        >
            <Tabs.Screen 
                name="profile" 
                options={{title: 'Moj profil', tabBarIcon: ({focused}) => (
                    <Ionicons
                        size={24}
                        name= {focused ? "person" : "person-outline"}
                        color={focused ? theme.iconColorFocused : theme.iconColor}
                    />
                )}}
            />
            <Tabs.Screen 
                name="portfolio" 
                options={{title: 'Portfolio', tabBarIcon: ({focused}) => (
                    <Ionicons
                        size={24}
                        name= {focused ? "podium" : "podium-outline"}
                        color={focused ? theme.iconColorFocused : theme.iconColor}
                    />
                )}}
            />
            <Tabs.Screen 
                name="news" 
                options={{title: 'Vesti', tabBarIcon: ({focused}) => (
                    <Ionicons
                        size={24}
                        name= {focused ? "newspaper" : "newspaper-outline"}
                        color={focused ? theme.iconColorFocused : theme.iconColor}
                    />
                )}}
            />
        </Tabs>
    )
}

export default DashboardLayout