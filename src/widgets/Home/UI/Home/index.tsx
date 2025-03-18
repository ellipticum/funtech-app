import React from 'react'
import Wrapper from '@/shared/UI/Wrapper'
import Intro from '@/widgets/Home/UI/Intro'
import NftMarket from '@/widgets/Home/UI/NftMarket'

const Home = () => {
    return (
        <Wrapper>
            <Intro />
            <NftMarket />
        </Wrapper>
    )
}

export default Home
