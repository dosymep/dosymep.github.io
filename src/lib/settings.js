const SETTINGS_STORAGE_NAME = 'settings'

export function loadSettings(browser) {
    let saved
    try {
        saved = JSON.parse(browser.localStorage.getItem(SETTINGS_STORAGE_NAME))
    } catch {
        // Browser preferences still work when storage is unavailable or invalid.
    }

    const overrides = {}
    if (saved?.theme === 'dark' || saved?.theme === 'light') {
        overrides.theme = saved.theme
    } else if (typeof saved?.dark === 'boolean') {
        overrides.theme = saved.dark ? 'dark' : 'light'
    }
    if (saved?.locale === 'ru' || saved?.locale === 'en') {
        overrides.locale = saved.locale
    } else if (typeof saved?.eng === 'boolean') {
        overrides.locale = saved.eng ? 'en' : 'ru'
    }

    const languages = browser.navigator.languages?.length
        ? browser.navigator.languages
        : [browser.navigator.language || 'en']
    const language = languages
        .map(language => language.toLowerCase().split('-')[0])
        .find(language => language === 'ru' || language === 'en') || 'en'

    return {
        dark: overrides.theme !== undefined
            ? overrides.theme === 'dark'
            : (browser.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false),
        eng: (overrides.locale ?? language) === 'en',
        overrides
    }
}

export function toggleSetting(settings, key) {
    const value = !settings[key]
    const override = key === 'dark'
        ? { theme: value ? 'dark' : 'light' }
        : { locale: value ? 'en' : 'ru' }
    return {
        ...settings,
        [key]: value,
        overrides: { ...settings.overrides, ...override }
    }
}

export function saveSettings(overrides, browser) {
    if (Object.keys(overrides).length === 0) return

    try {
        browser.localStorage.setItem(SETTINGS_STORAGE_NAME, JSON.stringify(overrides))
    } catch {
        // Keep the in-memory selection if the browser does not allow saving it.
    }
}
