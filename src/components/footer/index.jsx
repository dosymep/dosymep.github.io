import style from './style.module.css'
import { useContext } from 'preact/hooks'
import { SettingsContext } from '../settings'

export default function Footer() {
    const { content } = useContext(SettingsContext)

    return (
        <footer class={style.footer}>
            <div class={style.wrapper}>
                <p>{content.footer.copyright}</p>
            </div>
        </footer>
    )
}
