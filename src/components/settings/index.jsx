import { useEffect, useLayoutEffect, useMemo, useState } from 'preact/hooks'
import { createContext } from 'preact'
import translations from '../../resources/translations.json'
import { loadSettings, saveSettings, toggleSetting } from '../../lib/settings.js'

export const SettingsContext = createContext()

export function Settings({ children }) {
    const [preferences, setPreferences] = useState(() => loadSettings(window))
    const { dark, eng, overrides } = preferences
    const locale = eng ? 'en' : 'ru'
    const content = translations[locale]

    const settings = useMemo(() => {
        return {
            dark,
            eng,
            content,
            toggleDark: () => setPreferences(current => toggleSetting(current, 'dark')),
            toggleEng: () => setPreferences(current => toggleSetting(current, 'eng'))
        }
    }, [dark, eng, content])

    useLayoutEffect(() => {
        document.documentElement.lang = locale
        document.title = content.page.title
    }, [locale, content])

    useLayoutEffect(() => {
        document.documentElement.style.setProperty('color-scheme', dark ? 'dark' : 'light')
        if (dark) {
            document.documentElement.style.setProperty('color', 'var(--color-white)')
            document.documentElement.style.setProperty('background-color', 'var(--color-dark)')
        } else {
            document.documentElement.style.removeProperty('color')
            document.documentElement.style.removeProperty('background-color')
        }
    }, [dark])

    useEffect(() => {
        saveSettings(overrides, window)
    }, [overrides])

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    )
}
