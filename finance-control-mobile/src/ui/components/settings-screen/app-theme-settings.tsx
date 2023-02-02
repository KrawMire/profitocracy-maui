import { Button, ButtonGroup, Layout, Text } from "@ui-kitten/components";
import { sharedTextStyle } from "styles/shared/text.style";

export function AppThemeSettings() {
  return (
    <Layout>
      <Text style={sharedTextStyle.sectionTitle}>App Theme</Text>
      <ButtonGroup>
        <Button>Light</Button>
        <Button disabled>Dark</Button>
        <Button disabled>System</Button>
      </ButtonGroup>
    </Layout>
  )
}