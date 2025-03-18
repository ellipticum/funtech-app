'use client'

import React from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'

interface Props {
    isLight?: boolean
}

const Social = ({ isLight = true }: Props) => {
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
        <div className={styles.social}>
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
