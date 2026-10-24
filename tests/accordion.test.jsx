import { expect, test } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/preact'
import Accordion from '../src/components/accordion'
import { SettingsContext } from '../src/components/settings'

test('accordion starts closed and can be expanded and collapsed', () => {
    render(
        <SettingsContext.Provider value={{ dark: false }}>
            <Accordion label="Projects">
                <a href="https://github.com/dosymep">Project details</a>
            </Accordion>
        </SettingsContext.Provider>
    )

    expect(screen.queryByRole('link', { name: 'Project details' })).toBeNull()
    fireEvent.click(screen.getByText('Projects'))
    expect(screen.getByRole('link', { name: 'Project details' })).toBeTruthy()
    fireEvent.click(screen.getByText('Projects'))
    expect(screen.queryByRole('link', { name: 'Project details' })).toBeNull()
})
