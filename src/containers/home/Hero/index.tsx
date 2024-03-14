import React, { useState } from 'react'

//hooks
import { useRouter } from 'next/router'

//styles
import HeroImage from '@/assets/images/HeroImage.png'
import { MapPinIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import SelectCategoryDialog from '@/components/SelectCategoryDialog'

interface IHeroSectionProps {}

const HeroSection: React.FC<IHeroSectionProps> = props => {
  const router = useRouter()
  const [openSelectCategory, setOpenSelectCategory] = useState<boolean>(false)
  return (
    <>
      <div className="flex mx-auto laptop:mx-0 flex-col laptop:flex-row w-full space-x-5 justify-between mt-2 bg-gray-100 px-6 tablet:px-10 laptop:px-32 py-10 laptop:space-y-0 ">
        <div className="w-full laptop:w-1/2 flex flex-col ">
          <h2 className="text-gray-600 font-bold text-4xl mb-4">
            Sneakery - Trang đấu giá hàng đầu Việt Nam
          </h2>
          <p className="text-gray-400 text-lg">
            Chúng tôi có những sản phẩm cực hiếm và cực đẹp, việc của bạn đưa ra
            mức giá hợp lý nhất để mang nó về nhà.
          </p>
          <div className="flex w-fit space-x-4 mt-5">
            <button className="px-6 py-2 bg-white text-blue-500 font-semibold text-lg rounded-lg active:opacity-60">
              Mua sản phẩm
            </button>
            <button
              className="px-6 py-2 bg-blue-500 text-white font-semibold text-lg rounded-lg active:opacity-80"
              onClick={() => {
                setOpenSelectCategory(true)
                // router.push('/createProduct')
              }}
            >
              Đăng sản phẩm
            </button>
          </div>
          <div className="mt-10">
            <p className="text-gray-600 font-semibold text-lg">
              Nay đã có mặt tại
            </p>
            <div className="flex space-x-5 items-center w-fit mt-5">
              <div className="flex space-x-0.5 items-center ">
                <MapPinIcon className="w-8 h-8 text-red-500" />
                <p className="text-sm text-gray-500 font-semibold">Hà Nội</p>
              </div>
              <div className="flex space-x-0.5 items-center ">
                <MapPinIcon className="w-8 h-8 text-red-500" />
                <p className="text-sm text-gray-500 font-semibold">
                  Hồ Chí Minh
                </p>
              </div>
              <div className="flex space-x-0.5 items-center ">
                <MapPinIcon className="w-8 h-8 text-red-500" />
                <p className="text-sm text-gray-500 font-semibold">Đà Nẵng</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden laptop:flex">
          <Image src={HeroImage} alt="hero-img" width={400} height={400} />
        </div>
      </div>
      {openSelectCategory ? (
        <SelectCategoryDialog
          open={openSelectCategory}
          onClose={() => setOpenSelectCategory(false)}
        />
      ) : null}
    </>
  )
}

export default HeroSection
