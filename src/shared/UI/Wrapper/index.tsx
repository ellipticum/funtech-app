import React from 'react'
import styles from './styles.module.scss'
import { ILayoutProps } from '@/shared/interfaces/layoutProps'
import Header from '@/widgets/Header/UI'
import Footer from '@/widgets/Footer/UI'
import Main from '@/shared/UI/Main'

interface Props extends ILayoutProps {}

const Wrapper = ({ children }: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Header />
                <Main>{children}</Main>
            </div>
            <Footer />
        </div>
    )
}

export default Wrapper
