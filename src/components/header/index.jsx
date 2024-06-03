import style from './style.module.css'
import dosymep from '/dosymep.svg'
import { useContext } from 'preact/hooks'
import { SettingsContext } from '../settings'
import Icon from '../icon'

export default function Header() {
    const { dark, toggleDark, eng, toggleEng } = useContext(SettingsContext)
    return (
        <header class={`${style.header}${dark ? ' '+style._dark : ''}`}>
            <div class={style.wrapper}>
                <img class={style.logo} src={dosymep} alt="dosymep" />
                <button class={style.button} type="button" onClick={toggleEng}>{ eng ? 'RU' : 'ENG'}</button>
                <button class={style.button} type="button" onClick={toggleDark}>
                    <Icon name={ dark ? 'sun' : 'moon' } />
                </button>
            </div>
        </header>
    )
}