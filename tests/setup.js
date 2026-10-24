import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/preact'

beforeEach(() => {
    // Use DOM storage even when Node.js exposes its own localStorage global.
    vi.stubGlobal('localStorage', globalThis.jsdom.window.localStorage)
    vi.stubGlobal('navigator', globalThis.jsdom.window.navigator)
    localStorage.clear()
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['ru-RU'])
    vi.stubGlobal('matchMedia', vi.fn(query => ({ matches: false, media: query })))
})

afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    localStorage.clear()
    vi.unstubAllGlobals()
    document.documentElement.removeAttribute('style')
    document.documentElement.removeAttribute('lang')
    document.title = ''
})
