import style from './style.module.css'
import dosymep from '/dosymep.svg'
import { useContext } from 'preact/hooks'
import { SettingsContext } from '../settings'
import Icon from '../icon'

export default function Header() {
    const { dark, toggleDark, toggleEng, content } = useContext(SettingsContext)
    return (
        <header class={`${style.header}${dark ? ' '+style._dark : ''}`}>
            <div class={style.wrapper}>
                <img class={style.logo} src={dosymep} alt={content.header.logoAlt} />
                <button class={style.button} type="button" onClick={toggleEng}>{content.header.switchLanguage}</button>
                <button class={style.button} type="button" onClick={toggleDark} aria-label={dark ? content.header.lightTheme : content.header.darkTheme}>
                    <Icon name={ dark ? 'sun' : 'moon' } />
                </button>
            </div>
        </header>
    )
}
