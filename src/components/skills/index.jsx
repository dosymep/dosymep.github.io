import style from './style.module.css'
import { useMemo, useState, useContext } from 'preact/hooks'
import { SettingsContext } from '../settings'

export default function Skills({ active = false, visibleQuantity = 3 }) {
    const skills = [
        'C#',
        'GitHub',
        'DevExpress',
        '.NET Framework',
        'Windows Forms',
        'TFS',
        'ЛОЦМАН:PLM',
        'Altium Designer',
        'Компас-3D',
        'PCAD 2002',
        'Microsoft Visual Studio',
        'BIM',
        'Autodesk Revit',
        'Autodesk Navisworks',
        'WPF',
        'Iron Python',
        'Rider',
        'nukebuild',
        'github',
        'actions',
        'CI-CD'
    ]

    const [activeLocal, setActive] = useState(active)
    const { dark, eng } = useContext(SettingsContext)

    const toggleActive = () => setActive(!activeLocal)

    const buttonContent = useMemo(() => {
        return eng ? { show: 'Show more', hide: 'Hide' } : { show: 'Показать еще', hide: 'Скрыть' }
    }, [eng])

    const buttonLabel = useMemo(() => {
        return activeLocal ? buttonContent.hide : buttonContent.show
    }, [activeLocal, buttonContent])

    const visibleSkills = useMemo(() => {
        return activeLocal ? skills : skills.slice(0, visibleQuantity)
    }, [activeLocal])

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