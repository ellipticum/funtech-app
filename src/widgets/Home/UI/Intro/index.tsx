import React from 'react'
import styles from './styles.module.scss'
import Button from '@/shared/UI/Button'
import Container from '@/shared/UI/Container'

const Intro = () => {
    return (
        <div className={styles.intro}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <div className={styles.overline}>
                            <div className={styles.line} />
                            <span>over 1M creators</span>
                        </div>
                        <div className={styles.text}>
                            <h1 className={styles.heading}>Discover And Create NFTs</h1>
                            <p className={styles.description}>
                                Discover, Create and Sell NFTs On Our NFT Marketplace With Over
                                Thousands Of NFTs And Get a{' '}
                                <span className={styles.dark}>$20 bonus</span>.
                            </p>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <Button isSpecial>Explore more</Button>
                        <Button isOutline isSpecial>
                            Create NFT
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Intro
