import { Button, Layout, Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import AppState from "src/domain/app-state/app-state";
import { setAppReady } from "state/global/actions";
import { finishStepStyles } from "styles/components/set-up-screen/finish.style";

export interface FinishStepProps {
  onMoveBack: () => void;
}

export function FinishStep(props: FinishStepProps) {
  const dispatch = useDispatch();

  const initialBalance = useSelector((state: AppState) => state.totalBalance.initialBalance);
  const baseCurrency = useSelector((state: AppState) => state.currencies.baseCurrency);
  const anchorDays = useSelector((state: AppState) => state.settings.settings.anchorDatesSettings.days);

  const joinedAnchorDays = anchorDays.join(", ");

  const onFinish = () => {
    dispatch(setAppReady(true));
  };

  return (
    <Layout>
      <Text>Finish. Check your initial data</Text>
      <Text>Main currency: {baseCurrency.name}</Text>
      <Text>
        Initial balance: {initialBalance ?? 0}
        {baseCurrency.symbol}
      </Text>
      <Text>Anchor days: {joinedAnchorDays}</Text>
      <Layout style={finishStepStyles.moveButtonsContainer}>
        <Button onPress={props.onMoveBack}>Back</Button>
        <Button onPress={onFinish}>Finish</Button>
      </Layout>
    </Layout>
  );
}
