import { Button, Layout, Text } from "@ui-kitten/components";

export interface FinishStepProps {
  onMoveBack: () => void;
}

export function FinishStep(props: FinishStepProps) {
  return (
    <Layout>
      <Text>Finish</Text>
      <Button onPress={props.onMoveBack}>
        Back
      </Button>
    </Layout>
  )
}