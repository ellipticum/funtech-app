import React, { useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import Button from '@/shared/UI/Button'
import Bullet from '@/widgets/Home/UI/Bullet/UI'

interface IntroContentProps {}

const IntroContent: React.FC<IntroContentProps> = () => {
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.classList.add(styles.visible)
        }
    }, [])

    return (
        <div className={styles.introContent} ref={contentRef}>
            <div className={styles.wrapper}>
                <div className={styles.block}>
                    <div className={`${styles.overline} ${styles.animatedItem}`}>
                        <div className={styles.line} />
                        <span>over 1M creators</span>
                    </div>
                    <div className={styles.text}>
                        <h1 className={`${styles.heading} ${styles.animatedItem}`}>
                            Discover And Create NFTs
                        </h1>
                        <p className={`${styles.description} ${styles.animatedItem}`}>
                            Discover, Create and Sell NFTs On Our NFT Marketplace With Over
                            Thousands Of NFTs And Get a{' '}
                            <span className={styles.dark}>$20 bonus</span>.
                        </p>
                    </div>
                </div>
                <div className={`${styles.buttons} ${styles.animatedItem}`}>
                    <Button isSpecial>Explore more</Button>
                    <Button isOutline isSpecial>
                        Create NFT
                    </Button>
                </div>
            </div>
            <Bullet />
        </div>
    )
}

export default IntroContent
