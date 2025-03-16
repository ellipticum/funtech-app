import React from 'react'
import Wrapper from '@/shared/UI/Wrapper'
import Intro from '@/widgets/Home/UI/Intro'
import Weekly from '@/widgets/Weekly/UI'

const Home = () => {
    return (
        <Wrapper>
            <Intro />
            <Weekly />
        </Wrapper>
    )
}

export default Home
