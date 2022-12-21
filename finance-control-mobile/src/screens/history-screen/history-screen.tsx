import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HistoryTypeButtonGroup } from "./components/history-type-button-group";

export function HistoryScreen() {
  const [historyType, setHistoryType] = useState("all");

  const handleChangeType = (type: string) => {
    setHistoryType(type);
  }

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
    header: {
      fontSize: 20,
      fontWeight: '600',
      padding: 25
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History</Text>
      <HistoryTypeButtonGroup onChangeType={handleChangeType} currentType={historyType}/>
      {historyType === "all" &&
      <Text>All history</Text>}
      {historyType === "period" &&
      <Text>Period history</Text>}
      {historyType === "day" &&
      <Text>Day history</Text>}
    </View>
  )
}