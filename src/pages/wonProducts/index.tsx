import FooterSection from '@/components/molecules/FooterSection'
import HeaderV2 from '@/components/organisms/HeaderV2'
import { Config } from '@/config/api'
import { useAuth } from '@/hooks/useAuth'
import { useAppSelector } from '@/hooks/useRedux'
import { IRootState } from '@/redux'
import { configResponse } from '@/utils/request'
import { FireIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import { Tooltip } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

interface IWonProductProps {}

const WonProduct: React.FC<IWonProductProps> = props => {
  const [items, setItems] = useState<any[]>([])
  const { user } = useAppSelector((state: IRootState) => state.auth)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [actionLoading, setActionLoading] = useState<boolean>(false)
  const { accessToken } = useAuth()

  const getWinningItems = async () => {
    try {
      setIsLoading(true)
      //THIS NEED TO FIX
      const response = await axios.get(`${Config.API_URL}/bids/win`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const { isSuccess, data, error } = configResponse(response)
      if (isSuccess) {
        setIsLoading(false)
        setItems(data?.data)
      } else {
        console.log('Error', error)
      }
    } catch (error) {
      setIsLoading(false)
      console.log('Client Error', error)
    }
  }

  const resetWinningItems = async () => {
    try {
      //THIS NEED TO FIX
      const response = await axios.get(`${Config.API_URL}/bids/win`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const { isSuccess, data, error } = configResponse(response)
      if (isSuccess) {
        setItems(data?.data)
      } else {
        console.log('Error', error)
      }
    } catch (error) {
      console.log('Client Error', error)
    }
  }

  useEffect(() => {
    if (items?.length == 0 && isLoading == false) {
      getWinningItems()
    }
  }, [items])

  return (
    <div className="bg-white">
      <Head>
        <title>Sneakery - Sản phẩm đã thắng</title>
        <link rel="icon" />
      </Head>
      <div className="pb-10 bg-white">
        <HeaderV2 />
        <div className="flex flex-col laptop:flex-row gap-y-10  justify-between mt-10 mx-auto laptop:px-0 px-8 laptop:w-5/6 gap-x-10 ">
          <div className="flex flex-col gap-y-5">
            <div className="flex justify-between items-center">
              <h1 className="text-gray-600 font-bold text-2xl mb-2">
                Sản phẩm bạn đã thắng
              </h1>
            </div>
            {isLoading ? (
              <div>
                <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
                <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
                <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
                <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>{' '}
                <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
                <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
              </div>
            ) : (
              <>
                {items.length > 0 ? (
                  <div className="flex flex-col gap-y-5">
                    {items.map((item, index) => (
                      <div
                        className="max-h-[350px] shadow-lg drop-shadow-sm h-[350px] py-4 border border-gray-200 flex flex-col items-center rounded-lg hover:opacity-70 cursor-pointer"
                        key={index.toString()}
                      >
                        {false ? (
                          <div className="w-full flex-initial mb-2 pl-3">
                            <div className="bg-red-500 rounded-lg px-2 py-1 w-fit animate-pulse flex items-center">
                              <FireIcon className="w-5 h-5 font-bold text-white mr-1" />
                              <p className="text-white text-xs font-bold">
                                Sản phẩm đang hot
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-lg px-2 py-1 w-fit animate-pulse flex items-center h-[30px]"></div>
                        )}
                        <img
                          src={item.imagePath}
                          width={200}
                          height={150}
                          className="min-h-[150px]"
                        />
                        <div className="justify-center px-4 space-y-1 mx-auto mt-4">
                          <h1 className="text-sm text-gray-600 font-bold text-center my-auto ">
                            {item?.name?.truncate(30)}
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
                                Chưa có ai đâu giá sản phẩm này
                              </p>
                              <p className="text-xs font-semibold text-blue-500"></p>
                            </div>
                          )}
                          <div className="flex items-center justify-center">
                            <p className="text-xs text-gray-500 font-normal text-center mr-1">
                              Số lượt đấu giá:{' '}
                            </p>
                            <p className="text-xs font-bold text-gray-500">
                              {item?.product.numberOfBids}
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <p className="text-xs text-gray-500 font-normal text-center mr-1">
                              Giá thắng:{' '}
                            </p>
                            <p className="text-xs font-bold text-gray-500">
                              {item.priceWin?.toString().prettyMoney()}$
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <InformationCircleIcon
                      width={20}
                      height={20}
                      className="text-gray-600 mr-2"
                    />
                    <h1 className="text-gray-500 font-regular text-md">
                      Bạn chưa thắng sản phẩm nào
                    </h1>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <FooterSection />
      </div>
    </div>
  )
}

export default WonProduct
