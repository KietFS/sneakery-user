import React, { useEffect, useState } from 'react'

//styles
import FooterSection from '@/components/molecules/FooterSection'
import HeaderV2 from '@/components/organisms/HeaderV2'
import LeftSide from '@/layouts/createProduct/LeftSide'
import RightSide from '@/layouts/createProduct/RightSide'
import Head from 'next/head'

//utils
import { withAuthorization } from '@/common/config/HOC/withAuth'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { useParams } from 'react-router-dom'

interface ICreateProductProps {}

const UpdateProduct: React.FC<ICreateProductProps> = props => {
  const params = useRouter()
  const productId = params?.query?.id

  return (
    <>
      <div className="bg-white">
        <Head>
          <title>Sneakery - Đăng sản phẩm</title>
          <link rel="icon" />
        </Head>
        <div className="pb-16 bg-white">
          <HeaderV2 />
        </div>
        <div className=" w-11/12 flex-col laptop:w-5/6 flex laptop:flex-row mx-auto gap-x-5 gap-y-10 bg-white h-fit rounded-xl p-1">
          <div className="w-full: laptop:w-full">{/* <LeftSide /> */}</div>
        </div>
        <FooterSection />
      </div>
    </>
  )
}

export default withAuthorization(UpdateProduct)
