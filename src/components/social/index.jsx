import style from './style.module.css'
import {useContext, useMemo} from 'preact/hooks'
import { SettingsContext } from '../settings'
import Icon from '../icon/index.jsx'

export default function Social() {
    const { dark } = useContext(SettingsContext)

    const links = useMemo(() => {
        return [
            {
                icon: 'telegram',
                url: 'https://t.me/dosymep'
            },
            {
                icon: dark ? 'hh' : 'hh-fill',
                url: 'https://omsk.hh.ru/resume/5dbf363bff07664abf0039ed1f3874556e4272'
            },
            {
                icon: 'github',
                url: 'https://github.com/dosymep'
            },
            {
                icon: 'linkedin',
                url: 'https://www.linkedin.com/in/dosymep/'
            },
            {
                icon: 'mail',
                url: 'dosymep@gmail.com'
            }
        ]
    }, [dark])

    return (
        <div class={`wrapper ${style.social}`}>
            {links.map(link => (
                <a
                    href={`${link.icon === 'mail' ? 'mailto:' : ''}${link.url}`}
                    title={link.icon}
                    target={link.icon === 'mail' ? '_self' : '_blank'}
                >
                    <Icon name={link.icon} />
                </a>
            ))}
        </div>
    )
}