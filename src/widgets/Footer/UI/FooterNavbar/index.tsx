import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

const Navbar = () => {
    const links = [
        {
            name: 'Privacy Policy',
            href: '#'
        },
        {
            name: 'Term & Conditions',
            href: '#'
        },
        {
            name: 'About Us',
            href: '#'
        },
        {
            name: 'Contact',
            href: '#'
        }
    ]

    return (
        <nav className={styles.navbar}>
            {links.map((link) => {
                return (
                    <Link className={styles.link} href={link.href}>
                        {link.name}
                    </Link>
                )
            })}
        </nav>
    )
}

export default Navbar
