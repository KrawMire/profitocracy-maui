import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HistoryTypeButtonGroupProps {
  onChangeType: (type: string) => void;
  currentType: string;
}

export function HistoryTypeButtonGroup(props: HistoryTypeButtonGroupProps) {
  const [currentType, setCurrentType] = useState(props.currentType);

  const handleOnPress = (type: string) => {
    props.onChangeType(type);
    setCurrentType(type);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled style={{
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        ...(currentType === "all" ? styles.activeButton : styles.button)
        }}
        onPress={() => handleOnPress("all")}
      >
        <Text style={
          currentType === "all" ? styles.activeButtonText : styles.buttonText
        }>All</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled style={
          currentType === "period" ? styles.activeButton : styles.button
        }
        onPress={() => handleOnPress("period")}
      >
        <Text style={
          currentType === "period" ? styles.activeButtonText : styles.buttonText
        }>Period</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled style={{
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        ...(currentType === "day" ? styles.activeButton : styles.button)
        }}
        onPress={() => handleOnPress("day")}
      >
        <Text style={
          currentType === "day" ? styles.activeButtonText : styles.buttonText
        }>Day</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  button: {
    borderWidth: 1,
    borderColor: "#00C070",
    height: 30
  },
  buttonText: {
    fontWeight: "600",
    color: "#00C070",
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 5,
    paddingBottom: 5
  },
  activeButton: {
    borderWidth: 1,
    borderColor: "#00C070",
    backgroundColor: "#00C070",
    height: 30
  },
  activeButtonText: {
    fontWeight: "600",
    color: "#FFFFFF",
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 5,
    paddingBottom: 5
  }
});