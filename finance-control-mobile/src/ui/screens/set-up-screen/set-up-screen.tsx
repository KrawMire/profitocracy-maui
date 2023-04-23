import StepIndicator from "react-native-step-indicator";
import { Layout } from "@ui-kitten/components";
import { useState } from "react";
import { WelcomeStep } from "components/set-up-screen/welcome-step";
import { FinishStep } from "components/set-up-screen/finish-step";
import { TotalBalanceStep } from "components/set-up-screen/total-balance-step";
import { CurrencyStep } from "components/set-up-screen/currency-step";
import { AnchorDatesStep } from "components/set-up-screen/anchor-dates-step";
import { setUpScreenStyles, stepIndicatorStyle } from "styles/screens/set-up.style";

const renderCurrentStep = (stepIndex: number, moveNext: () => void, moveBack: () => void) => {
  switch (stepIndex) {
    case 0:
      return <WelcomeStep onMoveNext={moveNext} />;
    case 1:
      return <CurrencyStep onMoveBack={moveBack} onMoveNext={moveNext} />;
    case 2:
      return <TotalBalanceStep onMoveBack={moveBack} onMoveNext={moveNext} />;
    case 3:
      return <AnchorDatesStep onMoveBack={moveBack} onMoveNext={moveNext} />;
    case 4:
      return <FinishStep onMoveBack={moveBack} />;
    default:
      return <Layout></Layout>;
  }
};

export function SetUpScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  const stepsLabels = ["Welcome", "Set currency", "Set total balance", "Set anchor dates", "Finish"];

  const onMoveNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const onMovePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Layout style={setUpScreenStyles.wrapper}>
      <StepIndicator
        labels={stepsLabels}
        stepCount={5}
        currentPosition={currentStep}
        customStyles={stepIndicatorStyle}
      />
      {renderCurrentStep(currentStep, onMoveNextStep, onMovePreviousStep)}
    </Layout>
  );
}
