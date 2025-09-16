import { createContext, useState, useEffect } from "react";
import { databases } from "../lib/appwrite"
import { ID, Permission, Query, Role } from "react-native-appwrite"
import { useUser } from "../hooks/useUser"

const DATABASE_ID = "68b7157f002323860dc0"
const ETF_COLLECTION_ID = "etfs"
const COLLECTION_ID = "portfolios"

export const PortfoliosContext = createContext()

export function PortfolioProvider({ children }) {
    const [portfolio, setPortfolio] = useState(null)
    const [etfs, setEtfs] = useState([]);
    const { user } = useUser()

    async function fetchEtfsFromPortfolio(portfolio) {
        try {
            const etfDocs = await Promise.all(
                portfolio.portfolioContents.map(async (item) => {
                    //console.log(JSON.stringify(item, null, 2))
                    const etf = await databases.getDocument(
                        DATABASE_ID,
                        ETF_COLLECTION_ID,
                        item.content.$id
                    );

                    return {
                        ...etf,
                        percentage: item.percentage
                    };
                })
            );

            setEtfs(etfDocs);
        } catch (error) {
            console.error(error.message);
        }
    }

    async function fetchPortfolioByUser(id) {
        try {
            const response = await databases.getDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            );

            setPortfolio(response)
            //console.log(response.name)
            await fetchEtfsFromPortfolio(response);
            //console.log(JSON.stringify(etfs, null, 2))
        } catch (error) {
            console.log(error.message)
        }
    }


    useEffect(() => {
        if (user) {
            if (user?.prefs?.["Investor Type"] == "Agresivan") {
                fetchPortfolioByUser("68b997a00024144441ad")
            } else if (user?.prefs?.["Investor Type"] == "Balansiran") {
                fetchPortfolioByUser("68b99774003400bdecff")
            } else {
                fetchPortfolioByUser("68b98c680009767d99a3")
            }
        }

    }, [user])



    return (
        <PortfoliosContext.Provider
            value={{ portfolio, etfs, fetchPortfolioByUser }}
        >
            {children}
        </PortfoliosContext.Provider>
    )
}