import style from './style.module.css'
import olzhas from '/dosymep.jpeg'
import {useContext, useMemo} from 'preact/hooks'
import { SettingsContext } from '../settings'
import Icon from '../icon'

export default function About() {
    const { dark, eng } = useContext(SettingsContext)

    const content = {
        eng: {
            hi: 'Hi, i\'m',
            name: 'Olzhas Biseuv',
            description: 'Senior Software Engineer C#. In my free time, I contribute to open source projects. I create libraries and tools to assist with working with Autodesk Revit.',
            location: 'From Russia, Omsk (GMT+6)',
            button: 'Download resume'
        },
        ru: {
            hi: 'Привет, я',
            name: 'Олжас Бисеув',
            description: 'Старший разработчик C#. В свободное время вношу вклад в open source. Создаю библиотеки и инструменты, помогающие в работе с Autodesk Revit.',
            location: 'Живу в Омске, Россия (GMT+6)',
            button: 'Скачать резюме'
        }
    }

    const currentContent = useMemo(() => {
        return eng ? content.eng : content.ru
    }, [eng])

    return (
        <div class={`wrapper ${style.about}`}>
            <p class={style.hi}>{currentContent.hi}</p>

            <p class={style.name}>
                {currentContent.name}<span class={`${style.signify}${dark ? ' '+style._dark : ''}`}>*</span>
            </p>
            
            <img class={style.image} src={olzhas} alt="Олжас Бисеув"/>

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