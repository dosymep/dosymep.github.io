import style from './style.module.css'
import { useDynamicSvgImport } from '../../lib/use-dynamic-svg-import.js'

export default function Icon(props) {
    const { name, size = '24' } = props
    const { loading, SVGIcon } = useDynamicSvgImport(name)
    return (
        <>
            {loading && <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" />}
            {SVGIcon && <SVGIcon class={`${style.icon}${props.class ? ' '+props.class : ''}`} width={size} height={size} />}
        </>
    )
}