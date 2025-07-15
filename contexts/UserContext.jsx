import { createContext, useState } from "react";
import { account } from "../lib/appwrite"
import { ID } from "react-native-appwrite";
import { useRouter  } from "expo-router";

export const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    const router = useRouter();

    async function login(email, password){
        try {
            await account.createEmailPasswordSession(email, password)
            const response = await account.get()
            setUser(response)
            router.replace('/profile')
        } catch(error){
            throw Error(error.message)
        }
    }

    async function register(email, password, fullName, phoneNumber, IPS){
        try {
            await account.create(ID.unique(), email, password, fullName)
            await login(email,password)
            await account.updatePhone(phoneNumber, password)
            await account.updatePrefs({IPS})
        } catch(error){
            throw Error(error.message)
        }
    }

    async function logout(){
        await account.deleteSession("current")
        setUser(null)
        router.replace('/login')
    }

    return(
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
        </UserContext.Provider>
    )
}