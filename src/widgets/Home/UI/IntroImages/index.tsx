import React from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import classNames from 'classnames'

const IntroImages = () => {
    return (
        <div className={styles.introImages}>
            <Image
                className={classNames(styles.image, styles.first)}
                src='/images/raster/intro-image-1.jpeg'
                alt='_'
                width={391}
                height={395}
            />
            <Image
                className={classNames(styles.image, styles.second)}
                src='/images/raster/intro-image-2.jpeg'
                alt='_'
                width={319}
                height={322}
            />
            <Image
                className={styles.arrow}
                src='/images/vector/arrow.svg'
                alt='_'
                width={128}
                height={124}
            />
            <Image
                className={styles.ornament}
                src='/images/vector/dot-ornament.svg'
                alt='_'
                width={173}
                height={192}
            />
        </div>
    )
}

export default IntroImages
