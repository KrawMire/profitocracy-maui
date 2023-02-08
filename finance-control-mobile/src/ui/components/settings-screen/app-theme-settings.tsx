import { Button, Layout, Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import AppState from "src/domain/app-state/app-state";
import { setTheme } from "state/app-settings/actions";
import ThemeSettings from "../../../domain/app-settings/components/theme-settings";

export function AppThemeSettings() {
  const dispatch = useDispatch();

  const currentTheme = useSelector((state: AppState) => state.settings.settings.themeSettings);

  const onChangeTheme = (theme: ThemeSettings) => {
    dispatch(setTheme(theme));
  }

  return (
    <Layout>
      <Button
        onPress={() => onChangeTheme(ThemeSettings.Light)}
        appearance={currentTheme === ThemeSettings.Light ? "outline" : "filled"}
      >
        Light
      </Button>
      <Button
        onPress={() => onChangeTheme(ThemeSettings.Dark)}
        appearance={currentTheme === ThemeSettings.Dark ? "outline" : "filled"}
      >
        Dark
      </Button>
      <Button disabled>System</Button>
    </Layout>
  )
}