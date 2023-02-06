import { Button, Layout, Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import AppState from "src/domain/app-state/app-state";
import { setTheme } from "state/app-settings/actions";
import { sharedTextStyle } from "styles/shared/text.style";
import ThemeSettings from "../../../domain/app-settings/components/theme-settings";

export function AppThemeSettings() {
  const dispatch = useDispatch();

  const currentTheme = useSelector((state: AppState) => state.settings.settings.themeSettings);

  const onChangeTheme = (theme: ThemeSettings) => {
    dispatch(setTheme(theme));
  }

  return (
    <Layout>
      <Text style={sharedTextStyle.sectionTitle}>App Theme</Text>
      <Layout>
        <Button
          onPress={() => onChangeTheme(ThemeSettings.Light)}

        >
          Light
        </Button>
        <Button
          onPress={() => onChangeTheme(ThemeSettings.Dark)}
        >
          Dark
        </Button>
        <Button disabled>System</Button>
      </Layout>
    </Layout>
  )
}