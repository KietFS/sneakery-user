import React from 'react'

//styles
import FooterSection from '@/components/FooterSection'
import HeaderV2 from '@/components/HeaderV2'
import LeftSide from '@/containers/createProduct/LeftSide'
import RightSide from '@/containers/createProduct/RightSide'
import Head from 'next/head'

//utils
import { withAuthorization } from '@/common/config/HOC/withAuth'

interface ICreateProductProps {}

const CreateProduct: React.FC<ICreateProductProps> = props => {
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
          <div className="w-full: laptop:w-2/3">
            <LeftSide />
          </div>
          <div className="w-full laptop:w-1/3">
            <RightSide />
          </div>
        </div>
        <FooterSection />
      </div>
    </>
  )
}

export default withAuthorization(CreateProduct)
