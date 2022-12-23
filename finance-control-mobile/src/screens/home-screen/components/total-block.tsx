import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface TotalBlockProps {
  totalSum: number;
  style?: object;
}

export function TotalBlock(props: TotalBlockProps) {
  const styles = StyleSheet.create({
    container: {
      width: '90%',
      height: 115,
      marginBottom: 40,

      // Shadow styles
      shadowColor: "#000",
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowOffset: {
        height: 5,
        width: 0
      },
      ...props.style
    },
    containerGradient: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    header: {
      color: "#FFFFFF",
      fontSize: 12,
      padding: 15,
      paddingBottom: 10
    },
    totalBalance: {
      color: "#FFFFFF",
      fontWeight: '800',
      fontSize: 30,
      marginLeft: 15
    }
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00A661', '#90FF87']}
        style={styles.containerGradient}>
          <Text style={styles.header}>Current total balance</Text>
          <Text style={styles.totalBalance}>${props.totalSum}</Text>
      </LinearGradient>
    </View>
  );
}