'use client'

import React, { useState } from 'react'
import styles from './styles.module.scss'
import Logo from '@/shared/UI/Logo'
import Link from 'next/link'
import Container from '@/shared/UI/Container'
import Button from '@/shared/UI/Button'
import Image from 'next/image'
import { navbarLinks } from '@/shared/data/navbarLinks'
import { useNavbar } from '@/app/providers/NavbarProvider'

const Header = () => {
    const { isHidden, setIsHidden } = useNavbar()

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.tabletView}>
                        <div className={styles.info}>
                            <Logo isLight={false} />
                            <nav className={styles.navbar}>
                                {navbarLinks.map((link) => {
                                    return (
                                        <Link className={styles.link} href={link.href}>
                                            {link.name}
                                        </Link>
                                    )
                                })}
                            </nav>
                        </div>
                        <Button>Connect wallet</Button>
                    </div>
                    <div className={styles.mobileView}>
                        <Logo isLight={false} hasName />
                        <button
                            className={styles.menuButton}
                            onClick={() => setIsHidden((prevState) => !prevState)}
                        >
                            <Image
                                src={`/images/vector/${isHidden ? 'menu' : 'cross'}.svg`}
                                alt='_'
                                width={31}
                                height={22}
                            />
                        </button>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header
