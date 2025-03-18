'use client'

import React from 'react'
import styles from './styles.module.scss'
import { navbarLinks } from '@/shared/data/navbarLinks'
import Link from 'next/link'
import Social from '@/widgets/Social'
import Button from '@/shared/UI/Button'
import classNames from 'classnames'
import { useNavbar } from '@/app/providers/NavbarProvider'

const Navbar = () => {
    const { isHidden, setIsHidden } = useNavbar()

    return (
        <nav className={classNames(styles.navbar, { [styles.hidden]: isHidden })}>
            <div className={styles.content}>
                <div className={styles.links}>
                    {navbarLinks.map((link) => {
                        return (
                            <Link className={styles.link} href={link.href}>
                                {link.name}
                            </Link>
                        )
                    })}
                </div>
                <Social isLarge isLight={false} />
            </div>
            <Button isLarge>Connect wallet</Button>
        </nav>
    )
}

export default Navbar
