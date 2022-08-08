import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MainLayout from '../components/layout/MainLayout'
import { ReactElement } from 'react'
import { styled } from '../stitches.config'

const StyledContainer = styled('main', {
  padding: '$4'
})
const Home = () => {
  return (


    <StyledContainer >
      hello
    </StyledContainer>

  )
}


Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home
