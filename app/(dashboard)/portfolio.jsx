
import { StyleSheet, View, useColorScheme } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { useUser } from '../../hooks/useUser'
import { usePortfolio } from '../../hooks/usePortfolio'
import { Colors } from '../../constants/Colors'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedCard from '../../components/ThemedCard'



const Portfolio = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light


  const { portfolio, etfs } = usePortfolio()
  const screenWidth = Dimensions.get('window').width
  const defaultColors = ['#3475B7', '#082B4E', '#5293D2', '#23609D', '#041E37']


  const chartData = etfs.map((item, index) => ({
    name: item.name,
    population: item.percentage,
    color: defaultColors[index % defaultColors.length],
    legendFontColor: "#404040",
    legendFontSize: 18,
  })).sort((a, b) => b.population - a.population)


  return (
    <ThemedView style={styles.container} safe={true}>
      <ThemedCard>
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

            <Spacer />

            <ThemedText reverse={true} title={true} style={styles.heading}>{portfolio.name} portfolio</ThemedText>

            <ThemedText reverse={true}>Procenjeni rast {portfolio.yearly_increase}%</ThemedText>
          </>
        ) : (
          <ThemedText>Vaš portfolio je trenutno prazan.</ThemedText>
        )}
      </ThemedCard>


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
