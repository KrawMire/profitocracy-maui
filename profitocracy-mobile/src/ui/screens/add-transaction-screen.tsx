import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { Keyboard } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

export function AddTransactionScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout>
        <Text>Add transaction screen</Text>
      </Layout>
    </TouchableWithoutFeedback>
  );
}
