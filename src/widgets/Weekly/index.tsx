'use client'

import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Card from '@/shared/UI/Card'
import { ICard } from '@/shared/interfaces/card'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import Image from 'next/image'
import classNames from 'classnames'

// Generate random card data
const generateCards = (count: number): ICard[] => {
    return Array.from({ length: count }, (_, i) => {
        const now = new Date().getTime()
        return {
            id: `card-${i}`,
            name: `Item #${i + 1}`,
            price: parseFloat((Math.random() * 5 + 0.1).toFixed(2)),
            startsAt: now,
            endsAt: now + 1000 * 60 * 60 * 24 * (Math.floor(Math.random() * 3) + 1),
            image: `intro-image-1.jpeg`
        }
    })
}

const Weekly = () => {
    // Generate enough cards to ensure infinite scrolling appearance
    const [cards, setCards] = useState<ICard[]>(generateCards(20))

    // Configure Embla Carousel
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            dragFree: true,
            containScroll: false
        },
        [WheelGesturesPlugin()]
    )

    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(true)

    // Update scroll state
    const updateScrollState = useCallback(() => {
        if (!emblaApi) return
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
    }, [emblaApi])

    // Setup event listeners
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

    // Scroll functions
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    // Update card prices randomly
    useEffect(() => {
        const interval = setInterval(() => {
            setCards((prevCards) =>
                prevCards.map((card) => ({
                    ...card,
                    price: parseFloat((card.price + (Math.random() * 0.2 - 0.1)).toFixed(2))
                }))
            )
        }, 5000) // Update every 5 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <section className={styles.weekly}>
            <h2 className={styles.title}>Weekly Auctions</h2>
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
