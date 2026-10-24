import { expect, test } from 'vitest'
import translations from '../src/resources/translations.json'

function checkTranslation(reference, translation, path = '') {
    if (typeof reference === 'string') {
        expect(typeof translation, path).toBe('string')
        expect(translation.trim(), path).not.toBe('')
    } else if (Array.isArray(reference)) {
        expect(Array.isArray(translation), path).toBe(true)
        expect(translation.length, path).toBe(reference.length)
        reference.forEach((item, index) => checkTranslation(item, translation[index], `${path}[${index}]`))
    } else {
        expect(Object.keys(translation).sort(), path).toEqual(Object.keys(reference).sort())
        for (const key of Object.keys(reference)) {
            checkTranslation(reference[key], translation[key], `${path}.${key}`)
        }
    }
}

test('every locale has matching keys and nonempty translations for all content', () => {
    for (const [locale, content] of Object.entries(translations)) {
        checkTranslation(translations.ru, content, locale)
    }
})

test('skills have no duplicate labels that would break the visible skill count', () => {
    for (const content of Object.values(translations)) {
        expect(new Set(content.skills.items).size).toBe(content.skills.items.length)
    }
})
