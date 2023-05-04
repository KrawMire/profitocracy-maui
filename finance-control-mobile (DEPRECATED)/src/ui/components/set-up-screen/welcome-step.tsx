import { Button, Layout, Text } from "@ui-kitten/components";
import { welcomeStepStyles } from "styles/components/set-up-screen/welcome.style";

export interface WelcomeStepProps {
  onMoveNext: () => void;
}

export function WelcomeStep(props: WelcomeStepProps) {
  return (
    <Layout>
      <Text style={welcomeStepStyles.welcomeText}>Welcome</Text>
      <Button style={welcomeStepStyles.moveNextButton} onPress={props.onMoveNext}>
        Move to next step
      </Button>
    </Layout>
  );
}
