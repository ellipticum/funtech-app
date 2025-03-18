import React from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    isLight?: boolean
    hasName?: boolean
}

const Logo = ({ isLight = true, hasName = false }: Props) => {
    return (
        <Link className={styles.logo} href='/'>
            <Image
                className={styles.image}
                src={`/images/vector/logo-${isLight ? 'light' : 'dark'}.svg`}
                alt='_'
                width={47}
                height={47}
            />
            {hasName && <span className={styles.name}>DiveSea</span>}
        </Link>
    )
}

export default Logo
