import { Button, Layout, Text } from "@ui-kitten/components";
import { welcomeStepStyle } from "styles/components/set-up-screen/welcome-step.style";

export interface WelcomeStepProps {
  onMoveNext: () => void;
}

export function WelcomeStep(props: WelcomeStepProps) {
  return (
    <Layout>
      <Text style={welcomeStepStyle.welcomeText}>Welcome</Text>
      <Button style={welcomeStepStyle.moveNextButton} onPress={props.onMoveNext}>
        Move to next step
      </Button>
    </Layout>
  );
}
