import React from 'react'
import Wrapper from '@/shared/UI/Wrapper'
import Intro from '@/widgets/Home/UI/Intro'
import NftMarket from '@/widgets/Home/UI/NftMarket'
import Weekly from '@/widgets/Weekly'

const Home = () => {
    return (
        <Wrapper>
            <Intro />
            <Weekly />
            <NftMarket />
        </Wrapper>
    )
}

export default Home
