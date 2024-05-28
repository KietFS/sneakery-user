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
import axios from 'axios'
import { Config } from '@/config/api'
import ProductDescription from '@/layouts/products/Description'
import { IProductDetail } from '@/types'
import ProblemWithBidDialog from '@/components/organisms/ProblemWithBidDialog'
import { useRouter } from 'next/router'
import ProductComment from '@/layouts/products/Comments'

const Product = (props: any) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [bidHistory, setBidHistory] = useState<IProductBidHistoryItem[]>([])
  const [productDetail, setProductDetail] = useState<IProductDetail>()
  const [openProblemWithBid, setOpenProblemWithBid] = useState<boolean>(false)
  const route = useRouter()
  const productID = route.query.id

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
        `${Config.API_URL}/products/${route.query?.id}`,
      )

      if (productResponse?.data?.success) {
        setProductDetail(productResponse?.data?.data)
      }
    } catch (error) {
      console.log('GET PRODUCT DETAIL ERROR', error)
    }
  }

  useEffect(() => {
    if (!!productID) {
      getProductBidHistory(productID as string)
      getProductDetail()
    }
  }, [productID])

  return (
    <>
      {!!productDetail ? (
        <BidDialog
          onSuccess={() => {
            getProductBidHistory(productID as string)
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
          <title>Sneakery - {productDetail?.name}</title>
          <link rel="icon" />
        </Head>
        <div className="pb-10 bg-white">
          <HeaderV2 />
          <div className="rounded-lg bg-white border border-gray-100 shadow-lg mt-10  w-5/6 mx-auto ">
            <div className="flex flex-col laptop:flex-row">
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
            {!!productDetail && (
              <ProductDescription productDetail={productDetail} />
            )}
          </div>
        </div>

        <div className="w-5/6 mx-auto flex">
          <ProductComment />
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

// export const getStaticPaths: GetStaticPaths<{}> = async () => {
//   const response = await axios.get(`${Config.API_URL}/products/allid`)

//   const products = response.data?.data || []

//   const paths = products.map((item: number) => ({
//     params: {
//       id: `${item.toString()}`,
//     },
//   }))

//   return {
//     paths,
//     fallback: 'blocking',
//   }
// }

// export const getStaticProps: GetStaticProps<{
//   product: any
// }> = async ({ params }: any) => {
//   try {
//     // Use Promise.all to fetch both product and bid history concurrently
//     const productResponse = await axios.get(
//       `${Config.API_URL}/products/${params.id}`,
//     )

//     const product = productResponse.data.data
//     return {
//       props: {
//         product: {
//           id: params?.id,
//         },
//       },
//       revalidate: 10,
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     return {
//       props: {
//         product: null,
//       },
//       revalidate: 10,
//     }
//   }
// }

export default Product
