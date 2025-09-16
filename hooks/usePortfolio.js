import { useContext } from "react";
import { PortfoliosContext } from "../contexts/PortfoliosContext";


export function usePortfolio(){
    const context = useContext(PortfoliosContext)

    if(!context) throw new Error("usePortfolio used outside PortfoliosProvider!!!")

    return context
}