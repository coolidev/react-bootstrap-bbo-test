import { createContext, useState } from "react"

const defaultSettings = {
}

const SettingsContext = createContext({
  settings: defaultSettings,
  saveSettings: () => {}
})

export const SettingsProvider = ({ settings, children }) => {
  const [currentSettings, setCurrentSettings] = useState(defaultSettings);

  const handleSaveSettings = (update) => {
    const mergedSettings = { ...currentSettings, ...update };

    setCurrentSettings(mergedSettings);
  }

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        saveSettings: handleSaveSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
