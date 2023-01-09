import { ScrollView, StyleSheet, Text, View } from "react-native";

export function StatisticsScreen() {
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: '#F4F4F4',
      alignItems: 'center',
      paddingTop: '10%',
      paddingBottom: '15%',

      flex: 1,
      flexDirection: 'column',
    },
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Statistics screen</Text>
      </View>
    </ScrollView>
  )
}