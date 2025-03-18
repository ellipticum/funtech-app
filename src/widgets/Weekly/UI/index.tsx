'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Card from '@/shared/UI/Card'
import styles from './styles.module.scss'
import { ICard } from '@/shared/interfaces/card'
import { originalCards } from '@/widgets/Weekly/model/data/originalCards'
import { generateRandomPrice } from '@/widgets/Weekly/model/helpers/generateRandomPrice'
import Carousel from '@/shared/UI/Carousel'

const Weekly: React.FC = () => {
    const [cards, setCards] = useState<ICard[]>([])
    const [scrollPrev, setScrollPrev] = useState<() => void>(() => {})
    const [scrollNext, setScrollNext] = useState<() => void>(() => {})

    // Initialization of cards (only once)
    useEffect(() => {
        const duplicatedCards = [...originalCards, ...originalCards, ...originalCards]
        const uniqueCards = duplicatedCards.map((card, index) => ({
            ...card,
            id: `${Math.random().toString(36).substring(2)}-${card.id}-${index}`,
            price: generateRandomPrice()
        }))
        setCards(uniqueCards)
    }, [])

    // Update card prices every 5 seconds
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

    // Handler to receive navigation functions from Carousel
    const initHandlers = (prev: () => void, next: () => void) => {
        setScrollPrev(() => prev)
        setScrollNext(() => next)
    }

    return (
        <div className={styles.weekly}>
            <h2 className={styles.heading}>Weekly - Top NFT</h2>

            <Carousel
                isContainerLimited
                isTruncated
                isLoop={true}
                slidesToShow={3}
                gap={20}
                initHandlers={(prev, next) => initHandlers(prev, next)}
                pattern={[{ point: 0, slidesToShow: 12 }]}
            >
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        name={card.name}
                        image={card.image}
                        price={card.price}
                        startsAt={card.startsAt}
                        endsAt={card.endsAt}
                    />
                ))}
            </Carousel>

            <div className={styles.navButtons}>
                <button className={styles.navButton} onClick={scrollPrev}>
                    <Image
                        className={styles.icon}
                        src='/images/vector/arrow-left.svg'
                        alt='Previous'
                        width={26}
                        height={26}
                    />
                </button>
                <button className={styles.navButton} onClick={scrollNext}>
                    <Image
                        className={styles.icon}
                        src='/images/vector/arrow-left.svg'
                        alt='Next'
                        width={26}
                        height={26}
                    />
                </button>
            </div>
        </div>
    )
}

export default Weekly
