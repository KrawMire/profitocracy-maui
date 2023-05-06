import { Button, Layout, Text } from "@ui-kitten/components";
import { finishStepStyle } from "styles/components/set-up-screen/finish-step.style";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "state/app-state";
import { setIsAppSetUp } from "state/settings/actions";
import { addAnchorDate } from "state/anchor-dates/actions";
import { getCurrentAnchorDateOperation } from "operations/common/anchor-dates/get-current-anchor-date.operation";
import { showError } from "utils/toast/show-error";
import { AnchorDate } from "domain/anchor-date";
import { getCurrentDay } from "utils/dates/get-current-day";

export interface FinishStepProps {
  onMoveBack: () => void;
}

export function FinishStep(props: FinishStepProps) {
  const dispatch = useDispatch();

  const mainCurrency = useSelector((state: AppState) => state.settings.mainCurrency);
  const mainBalance = useSelector((state: AppState) => state.mainBalance);
  const anchorDays = useSelector((state: AppState) => state.settings.anchorDays);

  const joinedAnchorDays = anchorDays.join(", ");

  const onFinishClick = () => {
    let nearestAnchorDate: Date;
    try {
      nearestAnchorDate = getCurrentAnchorDateOperation(anchorDays, getCurrentDay());
    } catch (err) {
      showError("Cannot create first anchor date!");
      return;
    }

    const anchorDate: AnchorDate = {
      date: nearestAnchorDate,
      balance: mainBalance.amount,
    };

    dispatch(addAnchorDate(anchorDate));
    dispatch(setIsAppSetUp(true));
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
