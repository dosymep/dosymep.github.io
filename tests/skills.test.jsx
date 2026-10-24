import { expect, test } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/preact'
import Skills from '../src/components/skills'
import { SettingsContext } from '../src/components/settings'
import translations from '../src/resources/translations.json'

function SkillList({ locale = 'ru', ...props }) {
    return (
        <SettingsContext.Provider value={{ dark: false, content: translations[locale] }}>
            <Skills {...props} />
        </SettingsContext.Provider>
    )
}

function visibleSkills(locale = 'ru') {
    return translations[locale].skills.items.filter(skill => screen.getByText(skill).style.display !== 'none')
}

test('skills show the initial subset, expand, and collapse', () => {
    render(<SkillList />)
    expect(visibleSkills()).toEqual(translations.ru.skills.items.slice(0, 3))
    fireEvent.click(screen.getByRole('button', { name: translations.ru.skills.show }))
    expect(visibleSkills()).toEqual(translations.ru.skills.items)
    fireEvent.click(screen.getByRole('button', { name: translations.ru.skills.hide }))
    expect(visibleSkills()).toEqual(translations.ru.skills.items.slice(0, 3))
})

test('updating the visible quantity updates the collapsed list', () => {
    const list = render(<SkillList visibleQuantity={2} />)
    expect(visibleSkills()).toHaveLength(2)
    list.rerender(<SkillList visibleQuantity={5} />)
    expect(visibleSkills()).toEqual(translations.ru.skills.items.slice(0, 5))
})

test('changing language preserves the expanded list and translates labels and skills', () => {
    const list = render(<SkillList />)
    fireEvent.click(screen.getByRole('button', { name: translations.ru.skills.show }))
    list.rerender(<SkillList locale="en" />)
    expect(visibleSkills('en')).toEqual(translations.en.skills.items)
    expect(screen.getByRole('button', { name: translations.en.skills.hide })).toBeTruthy()
    expect(screen.queryByText('ЛОЦМАН:PLM')).toBeNull()
})
