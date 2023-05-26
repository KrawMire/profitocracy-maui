import { Button, Card, Input, Modal, Text } from "@ui-kitten/components";
import { AnchorDate } from "domain/anchor-date";
import { addAnchorDate } from "state/anchor-dates/actions";
import { anchorBalanceModalStyle } from "styles/components/home-screen/anchor-balance-modal.style";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { showError } from "utils/toast/show-error";

export interface AnchorBalanceModalProps {
  visible: boolean;
  actualBalance: number;
  anchorDate: Date;
  close: () => void;
}

export function AnchorBalanceModal(props: AnchorBalanceModalProps) {
  const dispatch = useDispatch();

  const [isInputManually, setIsInputManually] = useState(false);
  const [balance, setBalance] = useState(0);

  const createNewAnchorDate = (anchorBalance: number) => {
    const newAnchorDate: AnchorDate = {
      date: props.anchorDate,
      balance: anchorBalance,
    };

    dispatch(addAnchorDate(newAnchorDate));
  };

  const onEnterManually = () => {
    if (!isInputManually) {
      setIsInputManually(true);
    } else {
      createNewAnchorDate(balance);
      props.close();
    }
  };

  const onUsePrevious = () => {
    if (isInputManually) {
      setIsInputManually(false);
    } else {
      createNewAnchorDate(props.actualBalance);
      props.close();
    }
  };

  const onChangeBalance = (value: string) => {
    const balance = Number(value);

    if (!balance || isNaN(balance)) {
      showError("Incorrect balance value!");
    }

    setBalance(balance);
  };

  const onCloseModal = () => {
    props.close();
  };

  return (
    <Modal
      visible={props.visible}
      style={anchorBalanceModalStyle.balanceModal}
      backdropStyle={anchorBalanceModalStyle.balanceModalBackdrop}
      onBackdropPress={onCloseModal}
    >
      <Card header={<Text category="h3">Current Balance</Text>}>
        {isInputManually ? (
          <Input
            label="Current amount"
            placeholder="Enter the current balance..."
            value={balance.toString()}
            onChangeText={onChangeBalance}
            style={anchorBalanceModalStyle.balanceInput}
          />
        ) : (
          <Text style={anchorBalanceModalStyle.questionText}>
            New anchor period has been started! Would you like to use balance from previous period or enter new?
          </Text>
        )}
        <Button style={anchorBalanceModalStyle.confirmButton} onPress={onEnterManually}>
          {isInputManually ? "Set balance" : "Enter manually"}
        </Button>
        <Button style={anchorBalanceModalStyle.confirmButton} onPress={onUsePrevious} status="danger">
          {isInputManually ? "Back" : "Use previous value"}
        </Button>
      </Card>
    </Modal>
  );
}
