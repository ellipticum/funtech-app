'use client'

import React from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import classNames from 'classnames'

interface Props {
    isLight?: boolean
    isLarge?: boolean
}

const Social = ({ isLight = true, isLarge = false }: Props) => {
    const buttons = [
        {
            href: '#',
            src: 'inst'
        },
        {
            href: '#',
            src: 'in'
        },
        {
            href: '#',
            src: 'facebook'
        },
        {
            href: '#',
            src: `twitter-${isLight ? 'light' : 'dark'}`
        }
    ]

    return (
        <div className={classNames(styles.social, { [styles.large]: isLarge })}>
            {buttons.map((button) => {
                return (
                    <button
                        className={styles.button}
                        onClick={() => window.open(button.href, '_blank')}
                    >
                        <Image
                            className={styles.icon}
                            src={`/images/vector/${button.src}.svg`}
                            alt='_'
                            width={30}
                            height={30}
                        />
                    </button>
                )
            })}
        </div>
    )
}

export default Social
