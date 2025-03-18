import React from 'react'
import styles from './styles.module.scss'
import Container from '@/shared/UI/Container'
import Logo from '@/shared/UI/Logo'
import Social from '@/widgets/Social'
import FooterNavbar from '@/widgets/Footer/UI/FooterNavbar'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.first}>
                        <div className={styles.content}>
                            <Logo hasName />
                            <div className={styles.mobileView}>
                                <Social />
                            </div>
                            <div className={styles.tabletView}>
                                <FooterNavbar />
                            </div>
                        </div>
                        <div className={styles.mobileView}>
                            <FooterNavbar />
                        </div>
                    </div>
                    <div className={styles.second}>
                        <p className={styles.copyright}>© 2023 EATLY All Rights Reserved.</p>
                        <div className={styles.tabletView}>
                            <Social />
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer
