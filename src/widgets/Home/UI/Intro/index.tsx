import React from 'react'
import styles from './styles.module.scss'
import Container from '@/shared/UI/Container'
import IntroContent from '@/widgets/Home/UI/IntroContent'
import IntroImages from '@/widgets/Home/UI/IntroImages'

const Intro = () => {
    return (
        <div className={styles.intro}>
            <Container>
                <div className={styles.wrapper}>
                    <IntroContent />
                    <IntroImages />
                </div>
            </Container>
        </div>
    )
}

export default Intro
