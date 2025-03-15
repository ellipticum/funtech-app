import React from 'react'
import styles from './styles.module.scss'

const Bullet = () => {
    return (
        <div className={styles.bullet}>
            <div className={styles.item}>
                <span className={styles.value}>430K+</span>
                <span className={styles.name}>Art Works</span>
            </div>
            <div className={styles.item}>
                <span className={styles.value}>159K+</span>
                <span className={styles.name}>Creators</span>
            </div>
            <div className={styles.item}>
                <span className={styles.value}>87K+</span>
                <span className={styles.name}>Collections</span>
            </div>
        </div>
    )
}

export default Bullet
