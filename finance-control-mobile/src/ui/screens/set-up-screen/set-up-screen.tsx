import { Layout } from "@ui-kitten/components";
import { BillingPeriodsStep } from "components/set-up-screen/billing-periods-step";
import { FinishStep } from "components/set-up-screen/finish-step";
import { TotalBalanceStep } from "components/set-up-screen/total-balance-step";
import { WelcomeStep } from "components/set-up-screen/welcome-step";
import { useState } from "react";
import StepIndicator from "react-native-step-indicator";
import { setUpScreenStyles } from "styles/screens/set-up.style";

const renderCurrentStep = (
  stepIndex: number,
  moveNext: () => void,
  moveBack: () => void
) => {
  switch (stepIndex) {
    case 0:
      return (<WelcomeStep onMoveNext={moveNext} />);
    case 1:
      return (<TotalBalanceStep onMoveBack={moveBack} onMoveNext={moveNext}/>)
    case 2:
      return (<BillingPeriodsStep onMoveBack={moveBack} onMoveNext={moveNext}/>)
    case 3:
      return (<FinishStep onMoveBack={moveBack}/>)
    default:
      return (<Layout></Layout>);
  }
}

export function SetUpScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  const stepsLabels = [
    "Welcome",
    "Set total balance",
    "Set billing periods",
    "Finish"
  ];

  const onMoveNextStep = () => {
    setCurrentStep(currentStep + 1);
  }

  const onMovePreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  return (
    <Layout style={setUpScreenStyles.wrapper}>
      <StepIndicator
        labels={stepsLabels}
        stepCount={4}
        currentPosition={currentStep}
      />
      {renderCurrentStep(currentStep, onMoveNextStep, onMovePreviousStep)}
    </Layout>
  )
}