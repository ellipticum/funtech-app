'use client'

import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Card from '@/shared/UI/Card'
import { ICard } from '@/shared/interfaces/card'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import Image from 'next/image'
import classNames from 'classnames'

const generateCards = (count: number): ICard[] => {
    return Array.from({ length: count }, (_, i) => {
        const now = new Date().getTime()
        return {
            id: `card-${i}`,
            name: `Item #${i + 1}`,
            price: parseFloat((Math.random() * 5 + 0.1).toFixed(2)),
            startsAt: now,
            endsAt: now + 1000 * 60 * 60 * 24 * (Math.floor(Math.random() * 3) + 1),
            image: `nft-${(i % 5) + 1}.jpeg`
        }
    })
}

const Weekly = () => {
    const [cards, setCards] = useState<ICard[]>(generateCards(20))

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'center',
            dragFree: true,
            containScroll: false
        },
        [WheelGesturesPlugin()]
    )

    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(true)

    const updateScrollState = useCallback(() => {
        if (!emblaApi) return
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (emblaApi) {
            emblaApi.on('select', updateScrollState)
            emblaApi.on('init', updateScrollState)
            updateScrollState()
        }
        return () => {
            if (emblaApi) {
                emblaApi.off('select', updateScrollState)
                emblaApi.off('init', updateScrollState)
            }
        }
    }, [emblaApi, updateScrollState])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    // Автоплей: переход к следующему слайду каждые 3 секунды
    useEffect(() => {
        if (!emblaApi) return
        const autoplayInterval = setInterval(() => {
            emblaApi.scrollNext()
        }, 3000)
        return () => clearInterval(autoplayInterval)
    }, [emblaApi])

    useEffect(() => {
        const interval = setInterval(() => {
            setCards((prevCards) =>
                prevCards.map((card) => ({
                    ...card,
                    price: parseFloat((card.price + (Math.random() * 0.2 - 0.1)).toFixed(2))
                }))
            )
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <section className={styles.weekly}>
            <h2 className={styles.heading}>Weekly - Top NFT</h2>
            <div className={styles.carouselWrapper}>
                <div className={styles.viewport} ref={emblaRef}>
                    <div className={styles.container}>
                        {cards.map((card) => (
                            <div className={styles.slide} key={card.id}>
                                <Card {...card} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.navigation}>
                    <button
                        className={classNames(styles.navButton, {
                            [styles.disabled]: !canScrollPrev
                        })}
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                    >
                        <Image
                            src='/images/vector/arrow-left.svg'
                            alt='Previous'
                            width={24}
                            height={24}
                        />
                    </button>
                    <div className={styles.divider} />
                    <button
                        className={classNames(styles.navButton, styles.scrollNext, {
                            [styles.disabled]: !canScrollNext
                        })}
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                    >
                        <Image
                            src='/images/vector/arrow-left.svg'
                            alt='Next'
                            width={24}
                            height={24}
                        />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Weekly
