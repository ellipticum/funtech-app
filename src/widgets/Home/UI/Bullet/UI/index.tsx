import React, { useState, useEffect, useRef } from 'react'
import styles from './styles.module.scss'

interface Props {
    end: number
    suffix?: string
    duration?: number
}

const Counter = ({ end, suffix = 'K+', duration = 1500 }: Props) => {
    const [count, setCount] = useState<number>(0)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const countRef = useRef<HTMLSpanElement>(null)
    const animationStarted = useRef<boolean>(false)
    const frameRef = useRef<number>(0)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animationStarted.current) {
                    animationStarted.current = true
                    setIsVisible(true)
                    animateCount(0, end, duration)
                }
            },
            { threshold: 0.1 }
        )

        if (countRef.current) {
            observer.observe(countRef.current)
        }

        return () => {
            if (countRef.current) {
                observer.unobserve(countRef.current)
            }
            cancelAnimationFrame(frameRef.current)
        }
    }, [end, duration])

    const animateCount = (start: number, end: number, duration: number) => {
        const startTime = performance.now()

        const updateCount = (currentTime: number) => {
            const elapsedTime = currentTime - startTime
            const progress = Math.min(elapsedTime / duration, 1)

            const easeOutExpo = (x: number): number => {
                return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
            }

            const currentCount = Math.floor(easeOutExpo(progress) * (end - start) + start)
            setCount(currentCount)

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(updateCount)
            } else {
                setCount(end)
            }
        }

        frameRef.current = requestAnimationFrame(updateCount)
    }

    return (
        <span ref={countRef} className={`${styles.value} ${isVisible ? styles.animated : ''}`}>
            {count}
            {suffix}
        </span>
    )
}

const Bullet = () => {
    return (
        <div className={styles.bullet}>
            <div className={styles.item}>
                <Counter end={430} suffix='' duration={1800} />
                <span className={styles.name}>Art Works</span>
            </div>
            <div className={styles.item}>
                <Counter end={159} suffix='' duration={2000} />
                <span className={styles.name}>Creators</span>
            </div>
            <div className={styles.item}>
                <Counter end={87} suffix='' duration={1500} />
                <span className={styles.name}>Collections</span>
            </div>
        </div>
    )
}

export default Bullet
