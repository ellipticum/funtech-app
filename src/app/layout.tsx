import React from 'react'
import { ILayoutProps } from '@/shared/interfaces/layoutProps'
import '@/shared/styles/index.scss'
import { Metadata } from 'next'

interface Props extends ILayoutProps {}

export const metadata: Metadata = {
    title: 'Funtech',
    description: 'Some desc',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico'
    }
}

const RootLayout = ({ children }: Props) => {
    return (
        <html lang='ru'>
            <body>{children}</body>
        </html>
    )
}

export default RootLayout
