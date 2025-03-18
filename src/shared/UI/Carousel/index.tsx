import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import classNames from 'classnames'
import styles from './styles.module.scss'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

interface IPattern {
    point: number
    slidesToShow: number
}

interface Props {
    isLoop?: boolean
    hasDots?: boolean
    slidesToShow?: number
    height?: number
    gap?: number
    noIndent?: boolean
    isContainerLimited?: boolean
    disableMouseScrollAt992?: boolean
    extendBeyondContainer?: boolean
    isTruncated?: boolean
    pattern?: IPattern[]
    initHandlers?: (
        scrollPrev: () => void,
        scrollNext: () => void,
        canScrollPrev: boolean,
        canScrollNext: boolean
    ) => void
    children: React.ReactNode
}

const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches
        }
        return false
    })

    useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== matches) {
            setMatches(media.matches)
        }
        const listener = () => setMatches(media.matches)
        media.addEventListener('change', listener)
        return () => media.removeEventListener('change', listener)
    }, [matches, query])

    return matches
}

const Carousel = ({
    isLoop = false,
    hasDots = false,
    slidesToShow = 1,
    gap = 20,
    noIndent = false,
    isContainerLimited = false,
    disableMouseScrollAt992 = false,
    extendBeyondContainer = false,
    isTruncated = false,
    pattern = [],
    height,
    children,
    initHandlers
}: Props) => {
    const [currentSlidesToShow, setCurrentSlidesToShow] = useState(slidesToShow)
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const isLargeScreen = useMediaQuery('(min-width: 992px)')
    const isDraggable = !(disableMouseScrollAt992 && isLargeScreen)

    useLayoutEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            const matchedPattern = pattern
                .slice() // copy pattern.ts array to avoid mutation
                .sort((a, b) => b.point - a.point) // Sort in descending order of breakpoints
                .find((p) => width >= p.point) // Find the first match

            if (matchedPattern) {
                setCurrentSlidesToShow(matchedPattern.slidesToShow)
            } else {
                setCurrentSlidesToShow(slidesToShow) // Default if no match
            }
        }

        handleResize() // Run on mount
        window.addEventListener('resize', handleResize) // Add listener for resizing
        return () => window.removeEventListener('resize', handleResize) // Clean up
    }, [pattern, slidesToShow])

    const options = useMemo<EmblaOptionsType>(
        () => ({
            loop: isLoop,
            draggable: isDraggable,
            dragFree: true,
            dragThreshold: 5, // Минимальное расстояние для начала свайпа
            duration: 20, // Скорость анимации между слайдами
            skipSnaps: true, // Пропускать ли слайды при неудачном свайпе
            axis: 'x' // Горизонтальный свайп (по умолчанию)
        }),
        [isLoop, isDraggable]
    )

    // @ts-ignore
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [WheelGesturesPlugin()])

    const updateScrollState = useCallback(() => {
        if (!emblaApi) return
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (emblaApi) {
            // @ts-ignore
            emblaApi.reInit(options)
            emblaApi.on('select', updateScrollState)
            emblaApi.on('init', updateScrollState)
            updateScrollState()
        }
    }, [emblaApi, options, updateScrollState])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    useEffect(() => {
        if (initHandlers) {
            initHandlers(scrollPrev, scrollNext, canScrollPrev, canScrollNext)
        }
    }, [initHandlers, scrollPrev, scrollNext, canScrollPrev, canScrollNext])

    return (
        <div
            className={classNames(styles.carousel, {
                [styles.limitedContainer]: isContainerLimited,
                [styles.extendBeyond]: extendBeyondContainer,
                [styles.noIndent]: noIndent,
                [styles.truncated]: isTruncated
            })}
        >
            <div className={styles.viewport} ref={emblaRef}>
                <div
                    className={styles.container}
                    style={
                        {
                            '--slidesToShow': currentSlidesToShow,
                            '--gap': `${gap}px`,
                            height: height ? `${height}px` : 'auto'
                        } as React.CSSProperties
                    }
                >
                    {React.Children.map(children, (child) => (
                        <div className={styles.slide}>{child}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Carousel
