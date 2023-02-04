import { Button, Layout, Text } from "@ui-kitten/components";
import { billingPeriodsStepStyles } from "styles/components/set-up-screen/billing-periods.style";

export interface BillingPeriodsStepProps {
  onMoveNext: () => void;
  onMoveBack: () => void;
}

export function BillingPeriodsStep(props: BillingPeriodsStepProps) {
  return (
    <Layout>
      <Text>Set billing periods</Text>
      <Layout style={billingPeriodsStepStyles.moveButtonsContainer}>
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