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

const Home = (props: any) => {
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
          <ProductGrid />
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

export default Home
