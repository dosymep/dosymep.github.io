import { useEffect, useRef, useState } from 'preact/hooks'

/**
 * Динамический импорт SVG иконки как реакт компонент
 * @param {string} name - Имя импортируемой иконки
 * @returns {{loading: boolean, error: error, SVGIcon: ReactComponent}} - Объект с состоянием загрузки, ошибки и рекат компонентом иконки
 * Example: const { loading, error, SVGIcon } = useDynamicSvgImport('iconName')
 */
export function useDynamicSvgImport(name) {
    const ImportedIconRef = useRef(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(async () => {
        setLoading(true)
        try {
            ImportedIconRef.current = await import(`../icons/${name}.svg?react`).then(
                module => module.default
            )
        } catch (e) {
            console.error(e)
            setError(e)
        } finally {
            setLoading(false)
        }
    }, [name])

    return {
        loading,
        error,
        SVGIcon: ImportedIconRef.current
    }
}