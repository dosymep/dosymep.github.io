import style from './style.module.css'
import Accordion from '../accordion'
import Skills from '../skills'
import { useContext, useMemo } from 'preact/hooks'
import { SettingsContext } from '../settings'

export default function Features() {
    const { eng } = useContext(SettingsContext)

    const content = {
        eng: {
            skills: 'Skills',
            experience: 'Experience',
            experienceList: [
                {
                    location: 'pyRevitLabs',
                    position: 'Core Contributor',
                    description: 'Contribute as a core member to the development of pyRevit',
                    date: 'April 2021 - Present'
                },
                {
                    location: 'JSC "A101 DEVELOPMENT", Moscow',
                    position: 'Senior Software Engineer',
                    description: 'Development of a BIM platform for Autodesk Revit',
                    date: 'April 2021 - Present'
                },
                {
                    location: 'JSC ONIIP (Omsk Scientific-Research Institute of Instrument Engineering), Omsk',
                    position: 'Software Engineer',
                    description: 'Software Integration. LOODSMAN:PLM, KOMPAS-3D, Altium Designer, PCAD 2002',
                    date: 'April 2016 - April 2021'
                }
            ],
            education: 'Education',
            educationList: [
                {
                    position: 'Master\'s degree',
                    subtitle: 'Omsk State Transport University (OSTU)',
                    date: '2015-2017'
                },
                {
                    position: 'Bachelor\'s degree',
                    subtitle: 'Omsk State Transport University (OSTU)',
                    date: '2011-2015'
                }
            ]
        },
        ru: {
            skills: 'Навыки',
            experience: 'Опыт работы',
            experienceList: [
                {
                    location: 'pyRevitLabs',
                    position: 'Ключевой участник',
                    description: 'Участвую в развитии проекта pyRevit в качестве ключевого участника',
                    date: 'Апрель 2021 — н.в.'
                },
                {
                    location: 'A101, Москва',
                    position: 'Старший разработчик',
                    description: 'Разработка BIM-платформы для Autodesk Revit',
                    date: 'Апрель 2021 — н.в.'
                },
                {
                    location: 'АО Омский НИИ приборостроения, Омск',
                    position: 'Инженер программист',
                    description: 'Интеграция программного обеспечения. ЛОЦМАН:PLM, КОМПАС-3D, Altium Designer, PCAD 2002',
                    date: 'Апрель 2016 — Апрель 2021'
                }
            ],
            education: 'Образование',
            educationList: [
                {
                    position: 'Магистратура',
                    subtitle: 'Информационные системы и технологии',
                    description: 'ОмГУПС, Омск',
                    date: '2015-2017'
                },
                {
                    position: 'Бакалавр',
                    subtitle: 'Информационные системы и технологии',
                    description: 'ОмГУПС, Омск',
                    date: '2011-2015'
                }
            ]
        }
    }

    const currentContent = useMemo(() => {
        return eng ? content.eng : content.ru
    }, [eng])

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