import style from './style.module.css'
import { useContext, useState } from 'preact/hooks'
import { SettingsContext } from '../settings'
import Icon from '../icon'

export default function Accordion({ children, label = '' }) {
    const [active, setActive] = useState(false)
    const { dark } = useContext(SettingsContext)

    const toggleActive = () => setActive(!active)

    return (
        <div class={`${style.accordion}${active ? ' '+style._active : ''}`}>
            <div class={style.header} onClick={toggleActive}>
                <span class={style.label}>{label}</span>
                <Icon class={`${style.icon}${dark ? ' '+style._dark : ''}`} name="plus" />
            </div>
            <div class={style.content} style={{ display: active ? 'block' : 'none' }}>{children}</div>
        </div>
    )
}
