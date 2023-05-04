import { showMessage } from "react-native-flash-message";

export function showSuccess(message: string) {
  showMessage({
    type: "success",
    message: message,
  });
}
