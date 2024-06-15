import React, { useEffect, useState } from 'react'

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
import { withValidToken } from '@/common/config/HOC/withValidToken'

const Home = (props: any) => {
  return (
    <>
      <Head>
        <title>Trang chủ - Sneakery</title>
        <link rel="icon" />
      </Head>
      <div className="">
        <HeaderV2 />
        <HeroSection />
        <div className="w-5/6 mx-auto space-y-20">
          <TopSlider />
          <ProductGrid filerType="hot" />
          <ProductGrid filerType="new" />
          <VideoSection />
          <StepSection />
        </div>
        <FooterSection />
      </div>
    </>
  )
}

export default withValidToken(Home)
