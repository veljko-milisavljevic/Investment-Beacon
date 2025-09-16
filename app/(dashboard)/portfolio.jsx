
import { StyleSheet, View, useColorScheme } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { useUser } from '../../hooks/useUser'
import { usePortfolio } from '../../hooks/usePortfolio'
import { Colors } from '../../constants/Colors'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"



const Portfolio = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light


  const { portfolio, etfs } = usePortfolio()
  const screenWidth = Dimensions.get('window').width
  const defaultColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']


  const chartData = etfs.map((item, index) => ({
    name: item.name,
    population: item.percentage,
    color: defaultColors[index % defaultColors.length],
    legendFontColor: theme.text,
    legendFontSize: 18,
  })).sort((a, b) => b.population - a.population)


  return (
    <ThemedView style={styles.container} safe={true}>   

      {etfs.length > 0 ? (
        <><PieChart
        data={chartData}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          color: () => '#ffffffff',
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        center={[0, 0]}
        absolute={false}
      />

      <Spacer/>

      <ThemedText title={true} style={styles.heading}>{portfolio.name} portfolio</ThemedText>

      <ThemedText>Procenjeni rast ??%</ThemedText>
      </>
      ) : (
        <ThemedText>Vaš portfolio je trenutno prazan.</ThemedText>
      )}

    </ThemedView>
  )
}

export default Portfolio

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
})
