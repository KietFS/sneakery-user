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
import { setUser } from '@/redux/slices/auth'

//utils
import { IUser } from '@/types/user'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import axios from 'axios'

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  //function
  const dispatch = useAppDispatch()

  const setUserFromStorage = async () => {
    try {
      const data = await localStorage.getItem('user')
      const newData = JSON.parse(data as string) as IUser
      dispatch(setUser(newData))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setUserFromStorage()
  }, [])

  useEffect(() => {
    const storageUser = localStorage.getItem('user')
    storageUser && dispatch(setUser(JSON.parse(storageUser)))
  }, [])

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
  const data = await axios.get(
    'https://sneakery.herokuapp.com/api/products/homepage',
  )
  let products: IProductHomePageResponse[] = []
  if (data.data.data.products) {
    products = data.data?.data?.products as IProductHomePageResponse[]
  }

  return { props: { products } }
}

export default Home
