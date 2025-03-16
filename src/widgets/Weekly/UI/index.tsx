'use client'

import React, { useState, useEffect, useRef } from 'react'
import Card from '@/shared/UI/Card'
import styles from './styles.module.scss'
import { ICard } from '@/shared/interfaces/card'

const Weekly: React.FC = () => {
    const generateRandomPrice = (): number => {
        return Number((Math.random() * 9.5 + 0.5).toFixed(2))
    }

    const generateTimeframe = (): { startsAt: number; endsAt: number } => {
        const now = new Date()
        const start = new Date(now)
        start.setDate(start.getDate() - Math.floor(Math.random() * 30))

        const end = new Date(now)
        end.setDate(end.getDate() + Math.floor(Math.random() * 14) + 1)

        return {
            startsAt: start.getTime(),
            endsAt: end.getTime()
        }
    }

    const originalCards: ICard[] = [
        {
            id: 1,
            name: 'Cosmic Dreamer #1',
            image: 'nft-1.jpeg',
            price: generateRandomPrice(),
            ...generateTimeframe()
        },
        {
            id: 2,
            name: 'Digital Soul #42',
            image: 'nft-2.jpeg',
            price: generateRandomPrice(),
            ...generateTimeframe()
        },
        {
            id: 3,
            name: 'Neon Genesis #7',
            image: 'nft-3.jpeg',
            price: generateRandomPrice(),
            ...generateTimeframe()
        },
        {
            id: 4,
            name: 'Abstract Realm #23',
            image: 'nft-4.jpeg',
            price: generateRandomPrice(),
            ...generateTimeframe()
        },
        {
            id: 5,
            name: 'Virtual Landscape #11',
            image: 'nft-5.jpeg',
            price: generateRandomPrice(),
            ...generateTimeframe()
        },
        {
            id: 6,
            name: 'Crypto Punk #301',
            image: 'nft-3.jpeg',
            price: generateRandomPrice(),
            ...generateTimeframe()
        }
    ]

    const createInfiniteArray = (cards: ICard[]): ICard[] => {
        const prependCards = cards.map((card) => ({
            ...card,
            id: card.id - 1000,
            key: `prepend-${card.id}`
        }))

        const appendCards = cards.map((card) => ({
            ...card,
            id: card.id + 1000,
            key: `append-${card.id}`
        }))

        const originalWithKeys = cards.map((card) => ({
            ...card,
            key: `original-${card.id}`
        }))

        return [...prependCards, ...originalWithKeys, ...appendCards]
    }

    const [cards, setCards] = useState<ICard[]>([])
    const [currentIndex, setCurrentIndex] = useState<number>(originalCards.length)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [startPos, setStartPos] = useState<number>(0)
    const [currentTranslate, setCurrentTranslate] = useState<number>(0)
    const [prevTranslate, setPrevTranslate] = useState<number>(0)
    const swiperRef = useRef<HTMLDivElement>(null)
    const cardWidth = 280
    const transitionTime = 300
    const isDraggingRef = useRef(false)
    const isTransitioningRef = useRef(false)

    useEffect(() => {
        const infiniteCards = createInfiniteArray(originalCards)
        setCards(infiniteCards)

        const initialTranslate = -originalCards.length * cardWidth
        setPrevTranslate(initialTranslate)
        setCurrentTranslate(initialTranslate)

        if (swiperRef.current) {
            swiperRef.current.style.transform = `translateX(${initialTranslate}px)`
        }
    }, [])

    useEffect(() => {
        if (!cards.length) return

        const totalOriginalCards = originalCards.length

        const handleTransitionEnd = () => {
            isTransitioningRef.current = false

            if (swiperRef.current) {
                if (currentIndex >= totalOriginalCards * 2) {
                    swiperRef.current.style.transition = 'none'
                    const newIndex = currentIndex - totalOriginalCards
                    setCurrentIndex(newIndex)

                    const newTranslate = -newIndex * cardWidth
                    setPrevTranslate(newTranslate)
                    setCurrentTranslate(newTranslate)

                    swiperRef.current.style.transform = `translateX(${newTranslate}px)`

                    void swiperRef.current.offsetWidth
                    swiperRef.current.style.transition = `transform ${transitionTime}ms ease-out`
                } else if (currentIndex < totalOriginalCards) {
                    swiperRef.current.style.transition = 'none'
                    const newIndex = currentIndex + totalOriginalCards
                    setCurrentIndex(newIndex)

                    const newTranslate = -newIndex * cardWidth
                    setPrevTranslate(newTranslate)
                    setCurrentTranslate(newTranslate)

                    swiperRef.current.style.transform = `translateX(${newTranslate}px)`

                    void swiperRef.current.offsetWidth
                    swiperRef.current.style.transition = `transform ${transitionTime}ms ease-out`
                }
            }
        }

        if (swiperRef.current) {
            swiperRef.current.addEventListener('transitionend', handleTransitionEnd)
        }

        return () => {
            if (swiperRef.current) {
                swiperRef.current.removeEventListener('transitionend', handleTransitionEnd)
            }
        }
    }, [currentIndex, cards, originalCards.length])

    const touchStart = (e: React.MouseEvent | React.TouchEvent): void => {
        if (isTransitioningRef.current) return

        setIsDragging(true)
        isDraggingRef.current = true
        const clientX = 'touches' in e ? e.touches[0].clientX : e.pageX
        setStartPos(clientX)

        if (swiperRef.current) {
            swiperRef.current.style.transition = 'none'
        }
    }

    const touchMove = (e: React.MouseEvent | React.TouchEvent): void => {
        if (!isDraggingRef.current) return

        const clientX = 'touches' in e ? e.touches[0].clientX : e.pageX
        const currentPosition = clientX
        const currentMove = currentPosition - startPos
        setCurrentTranslate(prevTranslate + currentMove)

        if (swiperRef.current) {
            swiperRef.current.style.transform = `translateX(${currentTranslate}px)`
        }
    }

    const touchEnd = (): void => {
        if (!isDraggingRef.current) return

        setIsDragging(false)
        isDraggingRef.current = false
        isTransitioningRef.current = true

        const movedBy = currentTranslate - prevTranslate
        let indexChange = 0

        if (Math.abs(movedBy) > cardWidth / 3) {
            indexChange = Math.sign(-movedBy) * Math.ceil(Math.abs(movedBy) / cardWidth)
        }

        const newIndex = currentIndex + indexChange
        setCurrentIndex(newIndex)

        const newTranslate = -newIndex * cardWidth
        setPrevTranslate(newTranslate)
        setCurrentTranslate(newTranslate)

        if (swiperRef.current) {
            swiperRef.current.style.transition = `transform ${transitionTime}ms ease-out`
            swiperRef.current.style.transform = `translateX(${newTranslate}px)`
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCards((prevCards) =>
                prevCards.map((card) => ({
                    ...card,
                    price: generateRandomPrice()
                }))
            )
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const autoSlide = setInterval(() => {
            if (!isDraggingRef.current && !isTransitioningRef.current) {
                isTransitioningRef.current = true
                const nextIndex = currentIndex + 1
                setCurrentIndex(nextIndex)

                const newTranslate = -nextIndex * cardWidth
                setPrevTranslate(newTranslate)
                setCurrentTranslate(newTranslate)

                if (swiperRef.current) {
                    swiperRef.current.style.transition = `transform ${transitionTime}ms ease-out`
                    swiperRef.current.style.transform = `translateX(${newTranslate}px)`
                }
            }
        }, 3000)

        return () => clearInterval(autoSlide)
    }, [currentIndex])

    const navigate = (direction: 'prev' | 'next'): void => {
        if (isTransitioningRef.current) return
        isTransitioningRef.current = true

        const nextIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1
        setCurrentIndex(nextIndex)

        const newTranslate = -nextIndex * cardWidth
        setPrevTranslate(newTranslate)
        setCurrentTranslate(newTranslate)

        if (swiperRef.current) {
            swiperRef.current.style.transition = `transform ${transitionTime}ms ease-out`
            swiperRef.current.style.transform = `translateX(${newTranslate}px)`
        }
    }

    const getWrappedIndex = (index: number): number => {
        if (!cards.length) return 0
        const totalOriginalCards = originalCards.length
        return ((index % totalOriginalCards) + totalOriginalCards) % totalOriginalCards
    }

    const jumpToPage = (index: number): void => {
        if (isTransitioningRef.current) return
        isTransitioningRef.current = true

        const newIndex = originalCards.length + index
        setCurrentIndex(newIndex)

        const newTranslate = -newIndex * cardWidth
        setPrevTranslate(newTranslate)
        setCurrentTranslate(newTranslate)

        if (swiperRef.current) {
            swiperRef.current.style.transition = `transform ${transitionTime}ms ease-out`
            swiperRef.current.style.transform = `translateX(${newTranslate}px)`
        }
    }

    return (
        <div className={styles.weekly}>
            <h2 className={styles.heading}>Weekly - Top NFT</h2>

            <div className={styles.swiperContainer}>
                <div className={styles.swiperWrapper}>
                    <div
                        ref={swiperRef}
                        className={styles.cards}
                        onMouseDown={touchStart}
                        onMouseMove={touchMove}
                        onMouseUp={touchEnd}
                        onMouseLeave={touchEnd}
                        onTouchStart={touchStart}
                        onTouchMove={touchMove}
                        onTouchEnd={touchEnd}
                    >
                        {cards.map((card) => (
                            <div key={card.id} className={styles.cardWrapper}>
                                <Card
                                    id={card.id}
                                    name={card.name}
                                    image={card.image}
                                    price={card.price}
                                    startsAt={card.startsAt}
                                    endsAt={card.endsAt}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.navButtons}>
                <div className={styles.navButton} onClick={() => navigate('prev')}>
                    &lt;
                </div>
                <div className={styles.navButton} onClick={() => navigate('next')}>
                    &gt;
                </div>
            </div>

            {/*<div className={styles.pagination}>*/}
            {/*    {originalCards.map((_, index) => (*/}
            {/*        <span*/}
            {/*            key={index}*/}
            {/*            className={`${styles.dot} ${getWrappedIndex(currentIndex) === index ? styles.activeDot : ''}`}*/}
            {/*            onClick={() => jumpToPage(index)}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    )
}

export default Weekly
