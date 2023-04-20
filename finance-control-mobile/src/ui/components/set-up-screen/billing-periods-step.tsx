import { Button, Input, Layout } from "@ui-kitten/components";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { setBillingPeriod } from "state/app-settings/actions";
import { billingPeriodsStepStyles } from "styles/components/set-up-screen/billing-periods.style";
import { isNullOrZero } from "utils/null-check";

export interface BillingPeriodsStepProps {
  onMoveNext: () => void;
  onMoveBack: () => void;
}

export function BillingPeriodsStep(props: BillingPeriodsStepProps) {
  const dispatch = useDispatch();

  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");

  const validateDays = (startDay: number, endDay: number): boolean => {
    if (isNullOrZero(startDay) || isNullOrZero(endDay)) {
      showMessage({
        message: "Invalid value of start day or end day!",
        type: "danger",
      });
      return false;
    }

    if (startDay >= endDay) {
      showMessage({
        message: "Start day must be less than end day!",
        type: "danger",
      });
      return false;
    }

    if (startDay > 31 || endDay > 31) {
      showMessage({
        message: "Day must be less than 31!",
        type: "danger",
      });
      return false;
    }

    return true;
  };

  const onMoveNextClick = () => {
    const parsedStartDay = Number(startDay);
    const parsedEndDay = Number(endDay);

    if (!validateDays(parsedStartDay, parsedEndDay)) {
      return;
    }

    dispatch(setBillingPeriod(parsedStartDay, parsedEndDay));
    props.onMoveNext();
  };

  return (
    <Layout>
      <Input label="Start day" placeholder="Enter start day..." keyboardType="numeric" onChangeText={setStartDay} />
      <Input label="End day" placeholder="Enter end day..." keyboardType="numeric" onChangeText={setEndDay} />
      <Layout style={billingPeriodsStepStyles.moveButtonsContainer}>
        <Button style={billingPeriodsStepStyles.moveButton} onPress={props.onMoveBack}>
          Back
        </Button>
        <Button style={billingPeriodsStepStyles.moveButton} onPress={onMoveNextClick}>
          Next
        </Button>
      </Layout>
    </Layout>
  );
}
