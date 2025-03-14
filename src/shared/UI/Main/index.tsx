import React from 'react'
import styles from './styles.module.scss'
import { ILayoutProps } from '@/shared/interfaces/layoutProps'

interface Props extends ILayoutProps {}

const Main = ({ children }: Props) => {
    return <main className={styles.main}>{children}</main>
}

export default Main
