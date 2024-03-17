import React, { useEffect } from 'react'

//styles
import HeaderV2 from '@/components/HeaderV2'
import HeroSection from '@/containers/home/Hero'
import TopSlider from '@/containers/home/TopSlider'
import ProductGrid from '@/containers/home/ProductGrid'
import VideoSection from '@/containers/home/VideoSection'
import StepSection from '@/containers/home/StepSection'
import PartnerSection from '@/containers/home/PartnerSection'
import ContactSection from '@/containers/home/ContactSection'
import FooterSection from '@/components/FooterSection'
import Head from 'next/head'

//hooks
import { useAppDispatch } from '@/hooks/useRedux'

//store
import { setAuth, setUser, setUserBalance } from '@/redux/slices/auth'

//utils
import { IUser } from '@/types/user'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import axios from 'axios'
import { Config } from '@/config/api'
import { configResponse } from '@/utils/request'
import LoginDialog from '@/components/LoginDialog'
import store from '@/redux'

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  //function

  return (
    <>
      <Head>
        <title>Trang chủ - Sneakery</title>
        <link rel="icon" />
      </Head>
      <div className="pb-32">
        <HeaderV2 />
        <HeroSection />
        <div className="w-5/6 mx-auto space-y-20">
          <TopSlider />
          <ProductGrid
            listProducts={props.products as IProductHomePageResponse[]}
          />
          <VideoSection />
          <StepSection />
          <PartnerSection />
          <ContactSection />
          {/* <LoginDialog isOpen={true} onclickClose={() => {}} /> */}
        </div>
        <FooterSection />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<{
  products: IProductHomePageResponse[]
}> = async context => {
  // Fetch data from external API

  const response = await axios.get(`${Config.API_URL}/products/homepage`)
  let products: IProductHomePageResponse[] = []

  // const { isSuccess, data, error } = configResponse(response)

  // if (isSuccess) {
  //   products = (data?.data as IProductHomePageResponse[]) || []
  // } else {
  //   products = []
  // }

  products = []

  return { props: { products } }
}

export default Home
