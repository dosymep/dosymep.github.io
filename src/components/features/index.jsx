import style from './style.module.css'
import Accordion from '../accordion'
import Skills from '../skills'
import { useContext } from 'preact/hooks'
import { SettingsContext } from '../settings'

export default function Features() {
    const { content } = useContext(SettingsContext)

    const currentContent = content.features

    return (
        <div class={style.features}>
            <Accordion label={currentContent.skills}>
                <Skills />
            </Accordion>
            <Accordion label={currentContent.experience}>
                {currentContent.experienceList.map(item => (
                    <div class={style.experience}>
                        <p class={style.location}>{item.location}</p>
                        <p class={style.position}>{item.position}</p>
                        <p class={style.description}>{item.description}</p>
                        <p class={style.date}>{item.date}</p>
                    </div>
                ))}
            </Accordion>
            <Accordion label={currentContent.education}>
                {currentContent.educationList.map(item => (
                    <div class={style.experience}>
                        <p class={style.position}>{item.position}</p>
                        <p class={style.subtitle}>{item.subtitle}</p>
                        {item.description &&
                            <p class={style.description}>{item.description}</p>
                        }
                        <p class={style.date}>{item.date}</p>
                    </div>
                ))}
            </Accordion>
        </div>
    )
}