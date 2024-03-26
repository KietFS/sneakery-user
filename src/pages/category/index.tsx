import React, { useEffect, useMemo, useState } from 'react'

//styles
import HeaderV2 from '@/components/HeaderV2'
import FooterSection from '@/components/FooterSection'
import ProductGridV2 from '@/containers/category/ProductGridV2'
import FilterSideBar from '@/containers/category/FilterSideBar'
import Spinner from '@/components/Spinner'
import NotFound from '@/assets/images/NotFound.png'
import Image from 'next/image'

//hooks
import { useAppSelector } from '@/hooks/useRedux'

//store
import { IRootState } from '@/redux'
import { Pagination } from '@mui/material'

//utils
import SelectSortType from '@/containers/category/SelectSortType'
import Head from 'next/head'
import axios from 'axios'
import { Config } from '@/config/api'
import useDebounce from '@/hooks/useDebounce'
import { useDispatch } from 'react-redux'
import { DEFAULT_PAGE_SIZE } from '@/config/constant'

interface IProductProps {}

const Category = (props: IProductProps) => {
  //states
  const [listProduct, setListProduct] = useState<IProductHomePageResponse[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const [filterString, setFilterString] = useState<string>('')

  //redux
  const { keyWord, category, priceStart, priceEnd, sortType } = useAppSelector(
    (state: IRootState) => state.filter,
  )
  const dispatch = useDispatch()

  //constanst
  const filterStringDebounce = useDebounce<string>(filterString, 500)

  //functions
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const url = `${Config.API_URL}/products?${filterStringDebounce}&page=${
        currentPage - 1
      }&size=${DEFAULT_PAGE_SIZE}`
      const response = await axios.get(url)
      if (response?.data?.success) {
        setTotalPage(response?.data?._totalPage)
        setListProduct(response.data.data)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  //effects
  useEffect(() => {
    if (filterStringDebounce?.length > 0) {
      getAllProducts()
    }
  }, [filterStringDebounce, currentPage])

  useEffect(() => {
    setFilterString(
      `${keyWord !== null ? `keyword=${keyWord}` : ''}${
        category !== null ? `&category=${category?.id}` : ''
      }${priceStart !== null ? `&priceStart=${priceStart}` : ''}${
        priceEnd !== null ? `&priceEnd=${priceEnd}` : ''
      }${sortType !== null ? `&sort=${sortType}` : ''}`,
    )
  }, [category, keyWord, priceEnd, priceStart, sortType])

  return (
    <>
      <div className="bg-white">
        <Head>
          <title>Sneakery - Lọc sản phẩm</title>
          <link rel="icon" />
        </Head>
        <div className="pb-16 bg-white">
          <HeaderV2 />
        </div>
        <div className="w-5/6 mx-auto flex gap-x-10">
          <div className="w-1/4">
            <FilterSideBar />
          </div>
          <div className="w-3/4">
            <div className="w-full justify-between flex mb-4 items-center">
              {keyWord !== null && (
                <div className="text-gray-500 font-bold text-xl">
                  Kết quả tìm kiếm theo từ khóa {keyWord}
                </div>
              )}

              <Pagination
                onChange={(event, changedPage) => setCurrentPage(changedPage)}
                count={totalPage}
                defaultPage={1}
                page={currentPage}
              />
              <SelectSortType />
            </div>
            {loading ? (
              <div className="grid grid-flow-row grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 w-full gap-x-5 gap-y-10 mt-[30px]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]?.map(
                  (item, index) => (
                    <div className="max-h-[300px] h-[300px] py-4 border border-gray-200 bg-gray-300 flex flex-col items-center rounded-lg hover:opacity-70 cursor-pointer animate-pulse">
                      {' '}
                    </div>
                  ),
                )}
              </div>
            ) : (
              <>
                {listProduct?.length == 0 && loading == false ? (
                  <div className="flex flex-col items-center justify-center gap-y-5 mt-16">
                    <Image
                      src={NotFound}
                      className="rounded-lg border border-red-200"
                      width={300}
                      height={300}
                    />
                    <p className="text-xl text-gray-500 font-semibold">
                      Không tìm thấy sản phẩm phù hợp, vui lòng thử lại
                    </p>
                  </div>
                ) : (
                  <div className="mt-8">
                    <ProductGridV2 listProducts={listProduct} />
                    <div className="w-full mt-4 justify-between flex items-center">
                      <div></div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <FooterSection />
      </div>
    </>
  )
}

export default Category
