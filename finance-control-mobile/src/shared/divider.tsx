import { StyleSheet, View } from "react-native";

export function Divider() {
  return (
    <View
      style={{
        width: "90%",
        marginLeft: "5%",
        marginRight: "5%",
        borderBottomColor: '#5B5B5B',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  )
}