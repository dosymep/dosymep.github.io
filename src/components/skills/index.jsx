import style from './style.module.css'
import { useMemo, useState, useContext } from 'preact/hooks'
import { SettingsContext } from '../settings'

export default function Skills({ active = false, visibleQuantity = 3 }) {
    const [activeLocal, setActive] = useState(active)
    const { dark, content } = useContext(SettingsContext)

    const skills = content.skills.items

    const toggleActive = () => setActive(!activeLocal)

    const buttonLabel = activeLocal ? content.skills.hide : content.skills.show

    const visibleSkills = useMemo(() => {
        return activeLocal ? skills : skills.slice(0, visibleQuantity)
    }, [activeLocal, skills, visibleQuantity])

    return (
        <div class={style.skills}>
            {skills.map(skill => (
                <div
                    class={`${style.skill}${dark ? ' '+style._dark : ''}`}
                    style={{ display: visibleSkills.includes(skill) ? 'block' : 'none' }}
                >
                    {skill}
                </div>
            ))}
            <div class={style['button-wrapper']}>
                <button class={style.button} type="button" onClick={toggleActive}>{buttonLabel}</button>
            </div>
        </div>
    )
}