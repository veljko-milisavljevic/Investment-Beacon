import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useUser(){
    const context = useContext(UserContext)

    if(!context) throw new Error("useUser used outside UserProvider!!!")

    return context
}