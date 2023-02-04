import { Button, Layout, Text } from "@ui-kitten/components";
import { totalBalanceStepStyles } from "styles/components/set-up-screen/total-balance.style";

export interface TotalBalanceStepProps {
  onMoveNext: () => void;
  onMoveBack: () => void;
}

export function TotalBalanceStep(props: TotalBalanceStepProps) {
  return (
    <Layout>
      <Text>Set total balance</Text>
      <Layout style={totalBalanceStepStyles.moveButtonsContainer}>
        <Button onPress={props.onMoveBack}>
          Back
        </Button>
        <Button onPress={props.onMoveNext}>
          Next
        </Button>
      </Layout>
    </Layout>
  )
}