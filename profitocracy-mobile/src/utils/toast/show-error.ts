import { showMessage } from "react-native-flash-message";

export function showError(message: string) {
  showMessage({
    type: "danger",
    message: message,
  });
}
