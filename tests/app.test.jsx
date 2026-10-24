import { expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/preact'
import { App } from '../src/components/app.jsx'
import translations from '../src/resources/translations.json'

test('first visit uses browser language and theme throughout the page', () => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: true })
    render(<App />)

    const content = translations.ru
    expect(screen.getByText(content.about.description, { exact: false })).toBeTruthy()
    expect(screen.getByRole('img', { name: content.about.name })).toBeTruthy()
    expect(screen.getByText(content.features.skills)).toBeTruthy()
    expect(screen.getByText(content.footer.copyright)).toBeTruthy()
    expect(document.documentElement.lang).toBe('ru')
    expect(document.title).toBe(content.page.title)
    expect(document.documentElement.style.colorScheme).toBe('dark')
    expect(screen.getByRole('button', { name: content.header.lightTheme })).toBeTruthy()
    expect(localStorage.getItem('settings')).toBeNull()
})

test('switching language updates page content and metadata, and survives reopening', () => {
    const page = render(<App />)
    fireEvent.click(screen.getByRole('button', { name: translations.ru.header.switchLanguage }))

    const content = translations.en
    expect(screen.getByText(content.about.description, { exact: false })).toBeTruthy()
    expect(screen.getByRole('img', { name: content.about.name })).toBeTruthy()
    expect(screen.getByText(content.features.experience)).toBeTruthy()
    expect(screen.getByText(content.features.education)).toBeTruthy()
    expect(screen.getByText(content.footer.copyright)).toBeTruthy()
    fireEvent.click(screen.getByText(content.features.skills))
    expect(screen.getByRole('button', { name: content.skills.show })).toBeTruthy()
    expect(screen.getByRole('link', { name: content.social.mail }).title).toBe(content.social.mail)
    expect(document.documentElement.lang).toBe('en')
    expect(document.title).toBe(content.page.title)
    expect(JSON.parse(localStorage.getItem('settings'))).toEqual({ locale: 'en' })

    page.unmount()
    render(<App />)
    expect(screen.getByText(content.about.description, { exact: false })).toBeTruthy()
    expect(document.documentElement.lang).toBe('en')
})

test('theme can be switched both ways without saving the automatic language', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: translations.ru.header.darkTheme }))
    expect(document.documentElement.style.colorScheme).toBe('dark')
    expect(document.documentElement.style.backgroundColor).toBe('var(--color-dark)')
    expect(JSON.parse(localStorage.getItem('settings'))).toEqual({ theme: 'dark' })

    fireEvent.click(screen.getByRole('button', { name: translations.ru.header.lightTheme }))
    expect(document.documentElement.style.colorScheme).toBe('light')
    expect(document.documentElement.style.backgroundColor).toBe('')
    expect(JSON.parse(localStorage.getItem('settings'))).toEqual({ theme: 'light' })
})

test.each([
    ['ru', 'light'], ['ru', 'dark'], ['en', 'light'], ['en', 'dark']
])('saved locale %s and theme %s override browser preferences', (locale, theme) => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue([locale === 'ru' ? 'en-US' : 'ru-RU'])
    vi.mocked(window.matchMedia).mockReturnValue({ matches: theme !== 'dark' })
    localStorage.setItem('settings', JSON.stringify({ locale, theme }))
    render(<App />)

    expect(document.documentElement.lang).toBe(locale)
    expect(document.documentElement.style.colorScheme).toBe(theme)
    expect(screen.getByText(translations[locale].about.description, { exact: false })).toBeTruthy()
})

test('resume button opens the browser print dialog', () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => {})
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: translations.ru.about.button }))
    expect(print).toHaveBeenCalledTimes(1)
})

test('social links have accessible labels and valid destinations in both themes', () => {
    render(<App />)
    for (const theme of ['light', 'dark']) {
        const links = screen.getAllByRole('link')
        expect(links).toHaveLength(5)
        for (const link of links) {
            expect(link.getAttribute('aria-label')).toBeTruthy()
            expect(link.title).toBe(link.getAttribute('aria-label'))
            const url = new URL(link.href)
            expect(['https:', 'mailto:']).toContain(url.protocol)
            expect(link.target).toBe(url.protocol === 'mailto:' ? '_self' : '_blank')
        }
        expect(screen.getByRole('link', { name: translations.ru.social.mail }).href)
            .toBe('mailto:dosymep@gmail.com')
        if (theme === 'light') {
            fireEvent.click(screen.getByRole('button', { name: translations.ru.header.darkTheme }))
        }
    }
})

test('blocked storage does not break page rendering or the language switch', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked') })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Blocked') })
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: translations.ru.header.switchLanguage }))
    expect(document.documentElement.lang).toBe('en')
    expect(screen.getByText(translations.en.about.description, { exact: false })).toBeTruthy()
})
