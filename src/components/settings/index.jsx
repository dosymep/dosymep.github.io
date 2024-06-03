import { useEffect, useMemo, useState } from 'preact/hooks'
import { createContext } from 'preact'

export const SettingsContext = createContext()

export function Settings({ children }) {
    const SETTINGS_STORAGE_NAME = 'settings'
    const settingsStorage = localStorage.getItem(SETTINGS_STORAGE_NAME)

    const [dark, setDark] = useState(JSON.parse(settingsStorage)?.dark || false)
    const [eng, setEng] = useState(JSON.parse(settingsStorage)?.eng || false)

    const toggleDark = () => setDark(!dark)

    const toggleEng = () => setEng(!eng)

    const settings = useMemo(() => {
        return { dark, toggleDark, eng, toggleEng }
    }, [dark, eng])

    useEffect(() => {
        if (dark) {
            document.documentElement.style.setProperty('color', 'var(--color-white)')
            document.documentElement.style.setProperty('background-color', 'var(--color-dark)')
        } else {
            document.documentElement.style.removeProperty('color')
            document.documentElement.style.removeProperty('background-color')
        }
    }, [dark])

    useEffect(() => {
        localStorage.setItem(SETTINGS_STORAGE_NAME, JSON.stringify({ dark, eng }))
    }, [dark, eng])

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    )
}