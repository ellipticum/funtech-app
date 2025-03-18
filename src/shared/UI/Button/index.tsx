import React from 'react'
import styles from './styles.module.scss'
import { IButtonProps } from '@/shared/interfaces/buttonProps'
import classNames from 'classnames'
import { Icons } from '../Icons'

interface Props extends IButtonProps {
    isOutline?: boolean
    isSpecial?: boolean
    isCompact?: boolean
    isMini?: boolean
    isLarge?: boolean
    isInverted?: boolean
    isUppercase?: boolean
}

const Button = ({
    className,
    isInverted,
    isOutline,
    isSpecial,
    isCompact,
    isMini,
    isLarge,
    children,
    isUppercase = true,
    ...props
}: Props) => {
    return (
        <button
            className={classNames(
                styles.button,
                className,
                { [styles.large]: isLarge },
                { [styles.mini]: isMini },
                { [styles.inverted]: isInverted },
                { [styles.special]: isSpecial },
                { [styles.compact]: isCompact },
                { [styles.outline]: isOutline },
                { [styles.uppercase]: isUppercase }
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
