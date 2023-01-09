import AppSettings from "src/domain/app-settings/app-settings"

/**
 * Represents current state of app settings
 */
type AppSettingsState = {
  /**
   * Settings of the application
   */
  settings: AppSettings;
}

export default AppSettingsState;