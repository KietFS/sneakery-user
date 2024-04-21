import React, { ReactNode } from 'react'

//styles
import {
  BanknotesIcon,
  CheckBadgeIcon,
  TruckIcon,
} from '@heroicons/react/20/solid'

interface ITopSliderProps {}

const TopSlider: React.FC<ITopSliderProps> = props => {
  const benefits: { title: string; subTitle: string; icon: ReactNode }[] = [
    {
      title: 'Giá cả hợp lý',
      subTitle:
        'Đội ngũ chuyên gia thực hiện kiểm duyệt giá những sản phẩm hiện có. Điều này nhằm đảm bảo mỗi mức giá phản ánh đúng giá trị của sản phẩm',
      icon: (
        <BanknotesIcon className="text-blue-500 h-12 w-12 tablet:h-20 tablet:w-20 laptop:h-32 laptop:w-32 mx-auto" />
      ),
    },
    {
      title: 'Đảm bảo chất lượng',
      subTitle:
        'Chất lượng luôn là tiêu chí hàng đầu vì thế trước khi đến tay khách hàng những sản phẩm đã qua sự kiểm duyệt rất khắt khe từ người bán',
      icon: (
        <CheckBadgeIcon className="text-blue-500 h-12 w-12 tablet:h-20 tablet:w-20 laptop:h-32 laptop:w-32 mx-auto" />
      ),
    },
    {
      title: 'Vận chuyển nhanh chóng',
      subTitle:
        'Đội ngũ logistics chuyên nghiệp hàng đầu Việt Nam luôn đảm bảo sản phẩm đến tay khách hàng đúng giờ và an toàn',
      icon: (
        <TruckIcon className="text-blue-500 h-12 w-12 tablet:h-20 tablet:w-20 laptop:h-32 laptop:w-32 mx-auto" />
      ),
    },
  ]

  return (
    <div className="flex flex-col space-y-5 justify-center mt-20 ">
      <h2 className="text-gray-500 font-bold text-3xl text-center">
        Những lợi ích khi bạn tham gia cùng chúng tôi
      </h2>
      <div className="grid space-x-0 space-y-5 laptop:space-y-0 laptop:grid-cols-3 laptop:space-x-5">
        {benefits?.map((item, index) => (
          <div
            key={`slider-${index}`}
            className="border-2 border-gray-200 rounded-lg h-fit justify-between  min-h-[300px] px-4 py-4 laptop:px-0 laptop:justify-center items-center flex flex-row laptop:flex-col space-y-2 cursor-pointer hover:opacity-70 "
          >
            {item.icon}
            <div className="space-y-1 justify-center laptop:px-4 w-2/3 laptop:w-full">
              <p className="text-gray-500 font-semibold text-2xl laptop:text-center">
                {item.title}
              </p>
              <p className="text-gray-500 text-sm laptop:text-center">
                {item.subTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopSlider
