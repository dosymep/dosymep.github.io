import style from './style.module.css'
import { useContext } from 'preact/hooks'
import { SettingsContext } from '../settings'

export default function Footer() {
    const { eng } = useContext(SettingsContext)

    return (
        <footer class={style.footer}>
            <div class={style.wrapper}>
                <p>{eng ? 'since' : 'с'} 2024 {eng ? 'Olzhas Biseuv' : 'Олжас Бисеув'}</p>
            </div>
        </footer>
    )
}