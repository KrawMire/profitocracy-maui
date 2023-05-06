import { StyleSheet } from "react-native";

const colors = {
  progressBarWrapperBackgroundColor: "#e7e7e7",
};

export function getProgressBarStyle(percentage: number, reverseColors?: boolean) {
  let color = "#65e061";

  if (reverseColors) {
    if (percentage <= 20) {
      color = "#ee2828";
    } else if (percentage <= 50) {
      color = "#ecd325";
    }
  } else {
    if (percentage >= 80) {
      color = "#ee2828";
    } else if (percentage >= 60) {
      color = "#ecd325";
    }
  }

  return StyleSheet.create({
    progressBar: {
      backgroundColor: color,
      borderRadius: 5,
      height: "100%",
      width: `${percentage}%`,
    },
    progressBarWrapper: {
      backgroundColor: colors.progressBarWrapperBackgroundColor,
      borderRadius: 5,
      height: 20,
      marginVertical: 10,
      width: "100%",
    },
  });
}
