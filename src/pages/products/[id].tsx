import React, { useEffect, useState } from 'react'

//styles
import HeaderV2 from '@/components/organisms/HeaderV2'
import LeftSide from '@/layouts/products/LeftSide'
import RightSide, { IProductBidHistoryItem } from '@/layouts/products/RightSide'
import FooterSection from '@/components/molecules/FooterSection'
import SimilarProduct from '@/layouts/cart/SimilarProduct'
import BidDialog from '@/components/templates/BidDialog'
import Head from 'next/head'

//utils
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import axios from 'axios'
import { Config } from '@/config/api'
import ProductDescription from '@/layouts/products/Description'
import { IProductDetail } from '@/types'
import ProblemWithBidDialog from '@/components/organisms/ProblemWithBidDialog'

const Product = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [bidHistory, setBidHistory] = useState<IProductBidHistoryItem[]>([])
  const [productDetail, setProductDetail] = useState<IProductDetail>()
  const [openProblemWithBid, setOpenProblemWithBid] = useState<boolean>(false)

  const getProductBidHistory = async (productId: string | number) => {
    try {
      const response = await axios.get(
        `${Config.API_URL}/bid-history/product/${productId}`,
      )
      if (response?.data?.success) {
        setBidHistory(response?.data?.data)
      }
    } catch (error) {
      setBidHistory([])
      console.log('Error', error)
    }
  }

  const getProductDetail = async () => {
    try {
      const productResponse = await axios.get(
        `${Config.API_URL}/products/${props.product?.id}`,
      )

      if (productResponse?.data?.success) {
        setProductDetail(productResponse?.data?.data)
      }
    } catch (error) {
      console.log('GET PRODUCT DETAIL ERROR', error)
    }
  }

  useEffect(() => {
    getProductBidHistory(props.product.id)
    getProductDetail()
  }, [])

  return (
    <>
      {!!productDetail ? (
        <BidDialog
          onSuccess={() => {
            getProductBidHistory(props.product.id)
            getProductDetail()
          }}
          onProblemWithBid={() => setOpenProblemWithBid(true)}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          product={productDetail}
        />
      ) : null}

      {openProblemWithBid ? (
        <ProblemWithBidDialog
          open={openProblemWithBid}
          onClose={() => setOpenProblemWithBid(false)}
        />
      ) : null}

      <div className="bg-white">
        <Head>
          <title>Sneakery - {props.product?.name}</title>
          <link rel="icon" />
        </Head>
        <div className="pb-10 bg-white">
          <HeaderV2 />
          <div className="flex flex-col laptop:flex-row  rounded-lg bg-white border border-gray-100 shadow-lg mt-10 w-5/6 mx-auto min-h-[650px]">
            <div className="w-full laptop:w-3/5 desktop:w-1/2">
              <LeftSide product={productDetail} />
            </div>
            <div className=" w-full laptop:w-2/5 desktop:w-1/2">
              {!!productDetail ? (
                <RightSide
                  bidHistory={bidHistory}
                  product={productDetail}
                  onPlaceBid={() => setOpenDialog(true)}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="w-5/6 mx-auto flex">
          <ProductDescription productDetail={props?.product} />
        </div>
        <div className="w-5/6 mx-auto flex">
          {/* <SimilarProduct
            category={props.product.category}
            currentProductId={Number(props.product.id)}
          /> */}
        </div>
        <FooterSection />
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths<{}> = async () => {
  const response = await axios.get(`${Config.API_URL}/products/allid`)

  const products = response.data?.data || []

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
  product: IProductDetail
}> = async ({ params }: any) => {
  try {
    // Use Promise.all to fetch both product and bid history concurrently
    const productResponse = await axios.get(
      `${Config.API_URL}/products/${params.id}`,
    )

    const product = productResponse.data.data
    return {
      props: {
        product: product,
      },
      revalidate: 20,
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        product: null,
      },
      revalidate: 20,
    }
  }
}

export default Product
