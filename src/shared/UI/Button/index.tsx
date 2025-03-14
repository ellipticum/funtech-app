import React from 'react'
import styles from './styles.module.scss'
import { IButtonProps } from '@/shared/interfaces/buttonProps'
import classNames from 'classnames'
import { Icons } from '../Icons'

interface Props extends IButtonProps {
    isOutline?: boolean
    isSpecial?: boolean
}

const Button = ({ className, isOutline, isSpecial, children, ...props }: Props) => {
    return (
        <button
            className={classNames(
                styles.button,
                className,
                { [styles.special]: isSpecial },
                { [styles.outline]: isOutline }
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
