import React, { useState } from 'react'

//styles
import HeaderV2 from '@/components/HeaderV2'
import LeftSide from '@/containers/products/LeftSide'
import RightSide, {
  IProductBidHistoryItem,
} from '@/containers/products/RightSide'
import FooterSection from '@/components/FooterSection'
import SimilarProduct from '@/containers/cart/SimilarProduct'
import BidDialog from '@/components/BidDialog'
import Head from 'next/head'

//utils
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import axios from 'axios'

interface IProductProps {}

const Product = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  return (
    <>
      <BidDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        product={props.product}
      />
      <div className="bg-white">
        <Head>
          <title>Sneakery - {props.product?.name}</title>
          <link rel="icon" />
        </Head>
        <div className="pb-16 bg-white">
          <HeaderV2 />

          <div className="flex flex-col laptop:flex-row  rounded-lg bg-white border border-gray-100 shadow-lg mt-10 w-5/6 mx-auto min-h-[650px]">
            <div className="w-full laptop:w-3/5 desktop:w-1/2">
              <LeftSide product={props.product} />
            </div>
            <div className=" w-full laptop:w-2/5 desktop:w-1/2">
              <RightSide
                bidHistory={props.bidHistory}
                product={props.product}
                onPlaceBid={() => setOpenDialog(true)}
              />
            </div>
          </div>
        </div>
        <div className="w-5/6 mx-auto flex">
          <SimilarProduct
            brand={props.product.brand}
            category={props.product.category}
            currentProductId={Number(props.product.id)}
          />
        </div>
        <FooterSection />
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths<{}> = async () => {
  const data = await axios.get(
    'http://sneakery.herokuapp.com/api/products/allid',
  )
  const products = data.data?.data || []

  const paths = products.map((item: number) => ({
    params: {
      id: `${item.toString()}`,
    },
  }))

  return {
    paths,
    // fallback: false // bat ki path nao k returned boi getStaticPaths se toi trang 404
    fallback: 'blocking', // path nao k returned ngay lap tuc se show trang "tam thoi" => doi getStaticProps chay
    // => getStaticProps chay xong => return trang hoan chinh
  }
}

export const getStaticProps: GetStaticProps<{
  product: IProduct
  bidHistory: IProductBidHistoryItem[]
}> = async ({ params }: any) => {
  const data = await axios.get(
    `https://sneakery.herokuapp.com/api/products/${params.id}`,
  )

  const bidHistory = await axios.get(
    `https://sneakery.herokuapp.com/api/bid_history/product/${params.id}`,
  )

  const product = data.data.data

  return {
    props: {
      product,
      bidHistory: bidHistory?.data?.data,
    },
    revalidate: 5,
  }
}

export default Product
