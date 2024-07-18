import React, { useEffect, useState } from 'react'

//utils
import axios from 'axios'
import { Config } from '@/config/api'
import { configResponse } from '@/utils/request'
import { IProductDetail, IProductHomePageResponse } from '@/types'
import Slider from 'react-slick'
import { useRouter } from 'next/router'
import BaseImage from '@/components/atoms/Image'

interface ISimilarProduct {
  productDetail: IProductDetail
}

const SimilarProduct: React.FC<ISimilarProduct> = props => {
  const [listProduct, setListProduct] = useState<IProductHomePageResponse[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const [slideToShow, setSlidesToShow] = useState<number>(2)

  const getSimilarProducts = async () => {
    try {
      setLoading(true)
      const url = `${Config.API_URL}/products/recommendations/${props.productDetail.id}`
      const response = await axios.get(url)
      const { isSuccess, data, error } = configResponse(response)
      if (isSuccess) {
        setListProduct(data.data)
      } else {
        console.log('Error', error)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const CustomNextArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          background: 'gray',
          borderRadius: '50%',
          color: 'gray',
        }}
        onClick={onClick}
      />
    )
  }

  const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          background: 'gray',
          borderRadius: '50%',
          color: 'gray',
        }}
        onClick={onClick}
      />
    )
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1)
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2)
      } else if (window.innerWidth <= 1278) {
        setSlidesToShow(3)
      } else {
        setSlidesToShow(4)
      }
    }

    // Initial setup
    handleResize()

    // Listen for resize events
    window.addEventListener('resize', handleResize)

    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    getSimilarProducts()
  }, [])

  const settings = {
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    arrows: true,
    speed: 500,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    adaptiveHeight: true, // This makes the slider adapt to the image height
  }

  return (
    <>
      {listProduct?.length > 4 ? (
        <div className="h-fit rounded-lg shadow-lg bg-white mt-10 border border-gray-200 w-full px-8 pt-4 pb-8">
          <h2 className="text-xl laptop:text-2xl text-blue-500 font-bold">
            Sản phẩm tương tự
          </h2>
          <Slider {...settings}>
            {listProduct.map((item, index) => {
              return (
                <div
                  className="max-h-[350px] my-4 mr-2  h-[300px] py-4 border-r border-gray-300  flex flex-col items-center  hover:opacity-70 cursor-pointer"
                  key={index.toString()}
                  onClick={() => router.push(`/products/${item.id}`)}
                >
                  <div className="w-full flex justify-center">
                    <BaseImage
                      src={item.imagePath}
                      width={200}
                      height={150}
                      className="min-h-[150px] max-h-[150px]"
                    />
                  </div>
                  <div className="justify-center px-4 space-y-1 mx-auto mt-4">
                    <h1 className="text-sm text-gray-600 font-bold text-center my-auto ">
                      {item.name.truncate(30)}
                    </h1>
                    {!!item?.holder ? (
                      <div className="flex items-center justify-center">
                        <p className="text-xs text-gray-500 font-normal text-center mr-1">
                          Người đang giữ giá:{' '}
                        </p>
                        <p className="text-xs font-semibold text-blue-500">
                          {item?.holder}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <p className="text-xs text-gray-500 font-normal text-center mr-1">
                          Chưa có ai đấu giá sản phẩm này
                        </p>
                        <p className="text-xs font-semibold text-blue-500"></p>
                      </div>
                    )}
                    <div className="flex items-center justify-center">
                      <p className="text-xs text-gray-500 font-normal text-center mr-1">
                        Số lượt đấu giá:{' '}
                      </p>
                      <p className="text-xs font-bold text-gray-500">
                        {item?.numberOfBids}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="text-xs text-gray-500 font-normal text-center mr-1">
                        Giá hiện tại:{' '}
                      </p>
                      <p className="text-xs font-bold text-gray-500">
                        {item.currentPrice?.toString().prettyMoney()}$
                      </p>
                    </div>
                    {/* <div className="flex items-center justify-center">
                  <p className="text-xs font-bold text-gray-500">
                    <SmallCountdownTimer
                      bidClosingDate={item?.bidClosingDate as any}
                    />
                  </p>
                </div> */}
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      ) : null}
    </>
  )
}

export default SimilarProduct
