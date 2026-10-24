import assert from 'node:assert/strict'
import { test } from 'vitest'
import { loadSettings, saveSettings, toggleSetting } from '../src/lib/settings.js'

function createBrowser({ languages = ['ru-RU'], dark = false, saved = null } = {}) {
    const storage = new Map(saved === null ? [] : [['settings', saved]])
    return {
        navigator: { languages, language: 'en-US' },
        matchMedia(query) {
            assert.equal(query, '(prefers-color-scheme: dark)')
            return { matches: dark }
        },
        localStorage: {
            getItem: key => storage.get(key) ?? null,
            setItem: (key, value) => storage.set(key, value)
        }
    }
}

test('first visit follows browser preferences without persisting automatic choices', () => {
    const browser = createBrowser({ languages: ['ru-RU', 'en-US'], dark: true })
    const settings = loadSettings(browser)
    assert.deepEqual(settings, { dark: true, eng: false, overrides: {} })
    saveSettings(settings.overrides, browser)
    assert.equal(browser.localStorage.getItem('settings'), null)

    browser.navigator.languages = ['en-US']
    browser.matchMedia = () => ({ matches: false })
    assert.deepEqual(loadSettings(browser), { dark: false, eng: true, overrides: {} })
})

test('language selection respects browser order, regional tags, and English fallback', () => {
    for (const [languages, eng] of [
        [['en-GB', 'ru-RU'], true],
        [['de-DE', 'RU-ru', 'en-US'], false],
        [['fr-FR'], true]
    ]) {
        assert.equal(loadSettings(createBrowser({ languages })).eng, eng)
    }
    const browser = createBrowser({ languages: [] })
    browser.navigator.language = 'ru-RU'
    delete browser.matchMedia
    assert.equal(loadSettings(browser).eng, false)
    assert.equal(loadSettings(browser).dark, false)
})

test('existing false values override browser preferences', () => {
    const browser = createBrowser({
        languages: ['en-US'], dark: true,
        saved: JSON.stringify({ dark: false, eng: false })
    })
    assert.deepEqual(loadSettings(browser), {
        dark: false, eng: false, overrides: { theme: 'light', locale: 'ru' }
    })
    saveSettings(loadSettings(browser).overrides, browser)
    assert.deepEqual(JSON.parse(browser.localStorage.getItem('settings')), {
        theme: 'light', locale: 'ru'
    })
})

test('manual choices persist independently and survive reopening', () => {
    const browser = createBrowser()
    let settings = toggleSetting(loadSettings(browser), 'dark')
    saveSettings(settings.overrides, browser)
    assert.equal(browser.localStorage.getItem('settings'), '{"theme":"dark"}')

    browser.navigator.languages = ['en-US']
    settings = loadSettings(browser)
    assert.equal(settings.dark, true)
    assert.equal(settings.eng, true)

    settings = toggleSetting(settings, 'eng')
    saveSettings(settings.overrides, browser)
    assert.deepEqual(loadSettings(browser), {
        dark: true, eng: false, overrides: { theme: 'dark', locale: 'ru' }
    })
})

test('saving only a language choice leaves the theme automatic', () => {
    const browser = createBrowser()
    const settings = toggleSetting(loadSettings(browser), 'eng')
    saveSettings(settings.overrides, browser)
    assert.equal(browser.localStorage.getItem('settings'), '{"locale":"en"}')

    browser.matchMedia = () => ({ matches: true })
    assert.equal(loadSettings(browser).dark, true)
    assert.equal(loadSettings(browser).eng, true)
})

test('malformed or invalid saved settings fall back to browser preferences', () => {
    for (const saved of ['{broken', 'null', '[]', '42', '{"dark":"false","eng":1}',
        '{"theme":"auto","locale":"fr"}', '{"theme":true,"locale":false}']) {
        const browser = createBrowser({ dark: true, saved })
        assert.deepEqual(loadSettings(browser), { dark: true, eng: false, overrides: {} })
    }
})

test('named settings override browser preferences and legacy boolean settings', () => {
    for (const [theme, locale] of [['dark', 'en'], ['light', 'ru']]) {
        const browser = createBrowser({
            dark: theme !== 'dark',
            languages: [locale === 'en' ? 'ru-RU' : 'en-US'],
            saved: JSON.stringify({ theme, locale, dark: theme !== 'dark', eng: locale !== 'en' })
        })
        assert.deepEqual(loadSettings(browser), {
            dark: theme === 'dark', eng: locale === 'en', overrides: { theme, locale }
        })
    }
})

test('an invalid named preference does not discard the other valid preference', () => {
    const browser = createBrowser({
        saved: JSON.stringify({ theme: 'dark', locale: 'fr' })
    })
    assert.deepEqual(loadSettings(browser), {
        dark: true, eng: false, overrides: { theme: 'dark' }
    })
})

test('blocked storage does not prevent automatic settings or manual changes', () => {
    const browser = createBrowser()
    Object.defineProperty(browser, 'localStorage', {
        get() { throw new Error('Storage blocked') }
    })
    const settings = toggleSetting(loadSettings(browser), 'eng')
    assert.equal(settings.eng, true)
    assert.doesNotThrow(() => saveSettings(settings.overrides, browser))
})
