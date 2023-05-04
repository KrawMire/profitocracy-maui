import { Button, IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { anchorDaysStepStyle } from "styles/components/set-up-screen/anchor-days-step.style";
import { ScrollView } from "react-native";
import { setAnchorDays } from "state/settings/actions";

interface DayWithAvailableDays {
  dayIndex: IndexPath;
  availableDays: number[];
}

const getDaysFromDay = (day: number): number[] => {
  const res: number[] = [];

  if (day >= 31) {
    return res;
  }

  for (let i = day; i <= 31; i++) {
    res.push(i);
  }

  return res;
};

export interface AnchorDaysStepProps {
  onMoveNext: () => void;
  onMoveBack: () => void;
}

export function AnchorDaysStep(props: AnchorDaysStepProps) {
  const dispatch = useDispatch();

  const [anchorDays, setAnchorDaysState] = useState([
    {
      dayIndex: new IndexPath(0),
      availableDays: getDaysFromDay(1),
    },
  ]);

  const onChangeAnchorDay = (dayIndex: IndexPath, elementIndex: number) => {
    const newAnchorDays = [...anchorDays];
    newAnchorDays[elementIndex].dayIndex = dayIndex;

    setAnchorDaysState(newAnchorDays);
  };

  const onAddNewDayClick = () => {
    const newAnchorDays = [...anchorDays];
    const lastAnchorDay = anchorDays[anchorDays.length - 1];
    const lastAvailableDay = lastAnchorDay.availableDays[lastAnchorDay.dayIndex.row];

    const newAnchorDay: DayWithAvailableDays = {
      dayIndex: new IndexPath(0),
      availableDays: getDaysFromDay(lastAvailableDay),
    };

    newAnchorDays.push(newAnchorDay);
    setAnchorDaysState(newAnchorDays);
  };

  const onBackClick = () => {
    props.onMoveBack();
  };
  const onNextClick = () => {
    const filteredDays = anchorDays.filter((anchorDay) => anchorDay.availableDays.length !== 0);
    const days = filteredDays.map((anchorDay) => anchorDay.availableDays[anchorDay.dayIndex.row]);
    const clearDays = [...new Set(days)];

    dispatch(setAnchorDays(clearDays));

    props.onMoveNext();
  };

  return (
    <ScrollView style={anchorDaysStepStyle.mainWrapper}>
      {anchorDays.map((anchorDay, index) => (
        <Layout key={index} style={anchorDaysStepStyle.dayInputWrapper}>
          <Select
            style={anchorDaysStepStyle.dayInput}
            value={anchorDay.availableDays[anchorDay.dayIndex.row]}
            onSelect={(dayIndex) => onChangeAnchorDay(dayIndex as IndexPath, index)}
          >
            {anchorDay.availableDays.map((availableDay) => (
              <SelectItem key={availableDay} title={availableDay} />
            ))}
          </Select>
        </Layout>
      ))}
      <Layout style={anchorDaysStepStyle.addNewDayButtonWrapper}>
        <Button onPress={onAddNewDayClick} status="info" style={anchorDaysStepStyle.addNewDayButton}>
          Add new day
        </Button>
      </Layout>
      <Layout style={anchorDaysStepStyle.moveButtonsContainer}>
        <Button style={anchorDaysStepStyle.moveButton} onPress={onBackClick}>
          Back
        </Button>
        <Button style={anchorDaysStepStyle.moveButton} onPress={onNextClick}>
          Next
        </Button>
      </Layout>
    </ScrollView>
  );
}
