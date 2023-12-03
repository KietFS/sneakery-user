import React, { useEffect, useMemo, useState } from 'react'

//styles
import HeaderV2 from '@/components/HeaderV2'
import FooterSection from '@/components/FooterSection'
import ProductGridV2 from '@/containers/category/ProductGridV2'
import FilterSideBar from '@/containers/category/FilterSideBar'
import Spinner from '@/components/Spinner'
import NotFound from '@/assets/images/NotFound.png'
import Image from 'next/image'
import { debounce } from 'lodash'

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

interface IProductProps {}

const Category = (props: IProductProps) => {
  //states
  const [listProduct, setListProduct] = useState<IProductHomePageResponse[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [pageSelected, setPageSelected] = useState<number>(1)
  const [error, setError] = useState<boolean>(false)
  const [filterString, setFilterString] = useState<string>('')

  //redux
  const {
    brand,
    category,
    condition,
    color,
    priceEnd,
    priceStart,
    sortType,
    keyWord,
    size,
  } = useAppSelector((state: IRootState) => state.filter)

  const filterStringDebounce = useDebounce<string>(filterString, 500)

  const memoBrand = useMemo(() => {
    if (brand?.length > 0) {
      return brand
    }
  }, [brand])

  const memoColor = useMemo(() => {
    if (color?.length > 0) {
      return color
    }
  }, [color])

  const memoSize = useMemo(() => {}, [size])

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const url = `${Config.API_URL}/products?${filterString}&page=${pageSelected}&limit=12`
      const response = await axios.get(url)
      if (response) {
        setError(false)
        setListProduct(response.data.data.products)
      }
    } catch (error) {
      console.log(error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (filterStringDebounce.length > 0) {
      console.log('099090')
      getAllProducts()
    }
  }, [filterStringDebounce, pageSelected])

  useEffect(() => {
    setFilterString(
      `  ${keyWord !== null ? `keyword=${keyWord}` : ''}${
        condition !== null ? `&condition=${condition}` : ''
      }${category !== null ? `&category=${category}` : ''}${
        brand.length > 0
          ? `&brand=${brand.map((item: any, index: number) =>
              index !== brand.length ? `${item}` : `${item}`,
            )}`
          : ''
      }${
        color.length > 0
          ? `&color=${color.map((item: any, index: number) =>
              index !== color.length ? `${item}` : `${item}`,
            )}`
          : ''
      }${
        size.length > 0
          ? `&size=${size.map((item: any, index: number) =>
              index !== size.length ? `${item}` : `${item}`,
            )}`
          : ''
      }${priceStart !== null ? `&priceStart=${priceStart}` : ''}${
        priceEnd !== null ? `&priceEnd=${priceEnd}` : ''
      }${sortType !== null ? `&sorting=${sortType}` : ''}`,
    )
  }, [
    category,
    condition,
    brand,
    size,
    color,
    priceStart,
    priceEnd,
    sortType,
    keyWord,
  ])

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

              <SelectSortType />
            </div>
            {loading ? (
              <div className="w-full flex justify-center items-center h-[500px] font-bold">
                <Spinner />
              </div>
            ) : (
              <>
                {error === true && loading == false ? (
                  <div className="flex flex-col items-center justify-center gap-y-5 mt-16">
                    <Image
                      src={NotFound}
                      className="rounded-lg border border-red-200"
                      width={300}
                      height={300}
                    />
                    <p className="text-xl text-gray-500 font-semibold">
                      Không tìm thấy sản phẩm mà bạn yêu cầu, vui lòng thử lại
                    </p>
                  </div>
                ) : (
                  <>
                    <ProductGridV2 listProducts={listProduct} />
                    <div className="w-full mt-4 justify-between flex items-center">
                      <div></div>
                      <Pagination
                        count={3}
                        boundaryCount={10}
                        shape="rounded"
                        page={pageSelected}
                        onChange={(event, page) =>
                          setPageSelected(page as number)
                        }
                        color="primary"
                      />
                    </div>
                  </>
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
