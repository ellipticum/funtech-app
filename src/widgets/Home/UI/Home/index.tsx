'use client'

import React from 'react'
import Wrapper from '@/shared/UI/Wrapper'
import Intro from '@/widgets/Home/UI/Intro'
import NftMarket from '@/widgets/Home/UI/NftMarket'
import Weekly from '@/widgets/Weekly'
import Navbar from '@/widgets/Navbar'
import NavbarProvider, { useNavbar } from '@/app/providers/NavbarProvider'

const Home = () => {
    return (
        <NavbarProvider>
            <Wrapper>
                <Intro />
                <Weekly />
                <NftMarket />
                <Navbar />
            </Wrapper>
        </NavbarProvider>
    )
}

export default Home
