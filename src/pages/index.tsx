import React, { useEffect } from 'react'

//styles
import HeaderV2 from '@/components/organisms/HeaderV2'
import HeroSection from '@/layouts/home/Hero'
import TopSlider from '@/layouts/home/TopSlider'
import ProductGrid from '@/layouts/home/ProductGrid'
import VideoSection from '@/layouts/home/VideoSection'
import StepSection from '@/layouts/home/StepSection'
import PartnerSection from '@/layouts/home/PartnerSection'
import ContactSection from '@/layouts/home/ContactSection'
import FooterSection from '@/components/molecules/FooterSection'
import Head from 'next/head'
import { useAppSelector } from '@/hooks/useRedux'
import { IRootState } from '@/redux'

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
