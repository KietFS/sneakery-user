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
import { Config } from '@/config/api'

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
  const response = await axios.get(`${Config.API_URL}/products/allid`)
  const products = response.data?.data || []

  console.log('Static path products', products)

  const paths = products.map((item: number) => ({
    params: {
      id: `${item.toString()}`,
    },
  }))

  return {
    paths,
    fallback: 'blocking', // bat ki path nao k returned boi getStaticPaths se toi trang 404
    // fallback: 'blocking', // path nao k returned ngay lap tuc se show trang "tam thoi" => doi getStaticProps chay
    // // => getStaticProps chay xong => return trang hoan chinh
  }
}

export const getStaticProps: GetStaticProps<{
  product: IProduct
  bidHistory: IProductBidHistoryItem[]
}> = async ({ params }: any) => {
  try {
    // Use Promise.all to fetch both product and bid history concurrently
    const [productResponse, bidHistoryResponse] = await Promise.all([
      axios.get(`${Config.API_URL}/products/${params.id}`),
      axios.get(`${Config.API_URL}/bid-history/product/${params.id}`),
    ])

    const product = productResponse.data.data
    const bidHistory = bidHistoryResponse.data.data

    return {
      props: {
        product,
        bidHistory,
      },
      revalidate: 10,
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        product: null,
        bidHistory: null,
      },
      revalidate: 10,
    }
  }
}

export default Product
