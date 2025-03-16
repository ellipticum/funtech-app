'use client'

import React, { useLayoutEffect, useState } from 'react'
import { ICard } from '@/shared/interfaces/card'
import styles from './styles.module.scss'
import Image from 'next/image'
import Button from '@/shared/UI/Button'

let interval: NodeJS.Timeout | null = null

interface ITimeRemaining {
    days: number
    hours: number
    minutes: number
    seconds: number
}

interface Props extends ICard {}

const Card = ({ id, name, image, price, startsAt, endsAt }: Props) => {
    const [timeRemaining, setTimeRemaining] = useState<ITimeRemaining>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useLayoutEffect(() => {
        let interval = setInterval(() => {
            const now = new Date().getTime()

            const distance = endsAt - now

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24))
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((distance % (1000 * 60)) / 1000)

                setTimeRemaining({ days, hours, minutes, seconds })
            } else {
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [id])

    return (
        <div className={styles.card}>
            <Image
                className={styles.image}
                src={`/images/raster/${image}`}
                alt='_'
                width={253}
                height={253}
            />
            <div className={styles.wrapper}>
                <p className={styles.name}>{name}</p>
                <div className={styles.timer}>
                    {timeRemaining && (
                        <div className={styles.countdown}>
                            <div className={styles.timeUnit}>
                                {String(timeRemaining.hours).padStart(2, '0')}h
                            </div>
                            <div className={styles.timeUnit}>
                                {String(timeRemaining.minutes).padStart(2, '0')}m
                            </div>
                            <div className={styles.timeUnit}>
                                {String(timeRemaining.seconds).padStart(2, '0')}s
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.content}>
                    <div className={styles.bid}>
                        <p className={styles.bidName}>Current bid</p>
                        <div className={styles.bidPriceWrapper}>
                            <Image
                                className={styles.bidPriceSign}
                                src='/images/vector/ether.svg'
                                alt='_'
                                width={21}
                                height={21}
                            />
                            <p className={styles.bidPrice}>{price}</p>
                        </div>
                    </div>
                    <Button isCompact>Place bid</Button>
                </div>
            </div>
        </div>
    )
}

export default Card
