import { Button, Layout, Text } from "@ui-kitten/components";

export interface WelcomeStepProps {
  onMoveNext: () => void;
}

export function WelcomeStep(props: WelcomeStepProps) {
  return (
    <Layout>
      <Text>Welcome</Text>
      <Button onPress={props.onMoveNext}>
        Move to next step
      </Button>
    </Layout>
  )
}