import { showMessage } from "react-native-flash-message";

export function showWarning(message: string) {
  showMessage({
    type: "warning",
    message: message,
  });
}
