import { StyleSheet } from "react-native";
import { StepIndicatorStyles } from "react-native-step-indicator/lib/typescript/src/types";

export const setUpScreenStyles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
  },
});

export const stepIndicatorStyle: StepIndicatorStyles = {
  labelColor: "#2f15ce",
  separatorStrokeWidth: 5,

  currentStepLabelColor: "#2f15ce",
  stepStrokeCurrentColor: "#0c14c0",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelCurrentColor: "#ffffff",

  separatorFinishedColor: "#0c14c0",
  stepIndicatorFinishedColor: "#0c14c0",
  stepIndicatorLabelFinishedColor: "#0c14c0",
  separatorStrokeFinishedWidth: 7,

  separatorUnFinishedColor: "#b2bbff",
  stepIndicatorUnFinishedColor: "#b2bbff",
  stepIndicatorLabelUnFinishedColor: "#b2bbff",
};
