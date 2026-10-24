import { expect, test } from 'vitest'
import { render, waitFor } from '@testing-library/preact'
import Icon from '../src/components/icon'

test('icon loads its SVG and applies the requested size and class', async () => {
    const { container } = render(<Icon name="moon" size="32" class="theme-icon" />)
    await waitFor(() => expect(container.querySelector('svg path')).not.toBeNull())

    const svg = container.querySelector('svg')
    expect(svg.getAttribute('width')).toBe('32')
    expect(svg.getAttribute('height')).toBe('32')
    expect(svg.classList.contains('theme-icon')).toBe(true)
})

test('changing the icon name loads a different SVG', async () => {
    const { container, rerender } = render(<Icon name="moon" />)
    await waitFor(() => expect(container.querySelector('svg path')).not.toBeNull())
    const moonPath = container.querySelector('svg path').getAttribute('d')

    rerender(<Icon name="sun" />)
    await waitFor(() => {
        const path = container.querySelector('svg path')
        expect(path).not.toBeNull()
        expect(path.getAttribute('d')).not.toBe(moonPath)
    })
    expect(container.querySelectorAll('svg')).toHaveLength(1)
    expect(container.querySelector('svg').getAttribute('width')).toBe('24')
})
