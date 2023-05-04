import { Button, Layout, Text } from "@ui-kitten/components";
import { finishStepStyle } from "styles/components/set-up-screen/finish-step.style";
import { useSelector } from "react-redux";
import { AppState } from "state/app-state";
import { showSuccess } from "utils/toast/show-success";

export interface FinishStepProps {
  onMoveBack: () => void;
}

export function FinishStep(props: FinishStepProps) {
  const mainCurrency = useSelector((state: AppState) => state.settings.mainCurrency);
  const mainBalance = useSelector((state: AppState) => state.mainBalance);
  const anchorDays = useSelector((state: AppState) => state.settings.anchorDays);

  const joinedAnchorDays = anchorDays.join(", ");

  const onFinishClick = () => {
    showSuccess("Finished!");
  };

  return (
    <Layout>
      <Text>Finish. Check your initial data</Text>
      <Text>Main currency: {mainCurrency.name}</Text>
      <Text>
        Initial balance: {mainBalance.amount}
        {mainCurrency.symbol}
      </Text>
      <Text>Anchor days: {joinedAnchorDays}</Text>
      <Layout style={finishStepStyle.moveButtonsContainer}>
        <Button onPress={props.onMoveBack}>Back</Button>
        <Button onPress={onFinishClick}>Finish</Button>
      </Layout>
    </Layout>
  );
}
