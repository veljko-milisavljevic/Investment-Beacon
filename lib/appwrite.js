import { Client, Account, Avatars } from "react-native-appwrite"

export const client = new Client()

client
  .setProject('6866b933000f8ffa29a2')
  .setPlatform('dev.investment_beacon.investment_app')

export const account = new Account(client)
export const avatars = new Avatars(client)