import React from 'react'
import styles from './styles.module.scss'
import Container from '@/shared/UI/Container'
import Button from '@/shared/UI/Button'
import Image from 'next/image'

const NftMarket = () => {
    return (
        <section className={styles.nftMarket}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <div className={styles.info}>
                            <h2 className={styles.heading}>Create and Sell NFTs</h2>
                            <p className={styles.description}>World’s Largest NFT Place</p>
                        </div>
                        <div className={styles.buttons}>
                            <Button isUppercase={false} isMini isInverted>
                                Explore more
                            </Button>
                            <Button isUppercase={false} isMini isInverted isOutline>
                                Sell Artwork
                            </Button>
                        </div>
                    </div>
                    <div className={styles.imageWrapper}>
                        <Image
                            className={styles.image}
                            src='/images/raster/intro-image-1.jpeg'
                            alt='_'
                            width={300}
                            height={200}
                        />
                        <Image
                            className={styles.blur}
                            src='/images/raster/intro-image-1.jpeg'
                            alt='_'
                            width={300}
                            height={200}
                        />
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default NftMarket
