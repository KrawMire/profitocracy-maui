import { Layout } from "@ui-kitten/components";
import { getProgressBarStyle } from "styles/components/shared/progress-bar.style";

export interface ProgressBarProps {
  totalAmount: number;
  currentAmount: number;
  reverseColors?: boolean;
}

export function ProgressBar(props: ProgressBarProps) {
  let percentage = (props.currentAmount / props.totalAmount) * 100;
  percentage = percentage > 100 ? 100 : percentage;
  const style = getProgressBarStyle(percentage, props.reverseColors);

  return (
    <Layout style={style.progressBarWrapper}>
      <Layout style={style.progressBar}></Layout>
    </Layout>
  );
}
