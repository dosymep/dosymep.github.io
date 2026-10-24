import style from './style.module.css'
import olzhas from '/dosymep.jpeg'
import {useContext} from 'preact/hooks'
import { SettingsContext } from '../settings'
import Icon from '../icon'

export default function About() {
    const { dark, content } = useContext(SettingsContext)

    const currentContent = content.about

    return (
        <div class={`wrapper ${style.about}`}>
            <p class={style.hi}>{currentContent.hi}</p>

            <p class={style.name}>
                {currentContent.name}<span class={`${style.signify}${dark ? ' '+style._dark : ''}`}>*</span>
            </p>
            
            <img class={style.image} src={olzhas} alt={currentContent.name}/>

            <p class={style.description}><span class={`${style.signify}${dark ? ' '+style._dark : ''}`}>*</span>
                {currentContent.description}
                <br />
                <br />
                {currentContent.location}
            </p>

            <button
                class={`${style.link}${dark ? ' '+style._dark : ''}`}
                type="button"
                onClick={() => window.print()}
            >
                <Icon name="download" />
                {currentContent.button}
            </button>
        </div>
    )
}