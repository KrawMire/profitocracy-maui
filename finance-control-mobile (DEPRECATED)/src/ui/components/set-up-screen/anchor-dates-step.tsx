import { Button, Input, Layout } from "@ui-kitten/components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { anchorDatesStepStyles } from "styles/components/set-up-screen/anchor-dates.style";
import { ScrollView } from "react-native";
import { setAnchorDaysSettings } from "state/app-settings/actions";

export interface AnchorDatesStepProps {
  onMoveNext: () => void;
  onMoveBack: () => void;
}

export function AnchorDatesStep(props: AnchorDatesStepProps) {
  const dispatch = useDispatch();

  const [anchorDays, setAnchorDays] = useState<Array<number | null>>([null]);

  const onChangeDay = (value: string, index: number) => {
    const day = Number(value);
    const newDays = [...anchorDays];
    newDays[index] = day;

    setAnchorDays(newDays);
  };

  const onAddNewDay = () => {
    setAnchorDays([...anchorDays, null]);
  };

  const onMoveNextClick = () => {
    const resultDays: number[] = [];

    anchorDays.forEach((day) => {
      if (day) {
        resultDays.push(day);
      }
    });

    dispatch(setAnchorDaysSettings(resultDays));
    props.onMoveNext();
  };

  return (
    <ScrollView style={anchorDatesStepStyles.mainWrapper}>
      {anchorDays.map((day, index) => (
        <Layout key={index} style={anchorDatesStepStyles.dayInputWrapper}>
          <Input
            style={anchorDatesStepStyles.dayInput}
            placeholder="Enter anchor day of month..."
            keyboardType="numeric"
            value={day ? day.toString() : ""}
            onChangeText={(value) => onChangeDay(value, index)}
          />
        </Layout>
      ))}
      <Layout style={anchorDatesStepStyles.addNewDayButtonWrapper}>
        <Button onPress={onAddNewDay} status="info" style={anchorDatesStepStyles.addNewDayButton}>
          Add new day
        </Button>
      </Layout>
      <Layout style={anchorDatesStepStyles.moveButtonsContainer}>
        <Button style={anchorDatesStepStyles.moveButton} onPress={props.onMoveBack}>
          Back
        </Button>
        <Button style={anchorDatesStepStyles.moveButton} onPress={onMoveNextClick}>
          Next
        </Button>
      </Layout>
    </ScrollView>
  );
}
