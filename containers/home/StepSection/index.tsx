import React from 'react'

//styles
import {
  CircleStackIcon,
  CursorArrowRaysIcon,
  TruckIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline'

interface IStepSectionProps {}

const StepSection: React.FC<IStepSectionProps> = props => {
  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 dekstop:grid-cols-4 gap-x-10 gap-y-10">
      <div className="flex flex-col space-y-5 cursor-pointer hover:bg-gray-50 px-4 py-2">
        <UserPlusIcon className="text-gray-600 h-12 w-12" />
        <div className="space-y-2">
          <p className="text-gray-600 text-xl font-semibold">
            Đăng ký tài khoản
          </p>
          <p className="text-sm text-gray-500 font-light">
            Đăng ký tài khoản và định danh để có thể tham gia đấu giá
          </p>
        </div>
      </div>

      <div className="flex flex-col space-y-5 cursor-pointer hover:bg-gray-50 px-4 py-2">
        <CursorArrowRaysIcon className="text-gray-600 h-12 w-12" />
        <div className="space-y-2">
          <p className="text-gray-600 text-xl font-semibold">
            Tìm kiếm sản phẩm
          </p>
          <p className="text-sm text-gray-500 font-light">
            Dạo quanh Sneakery và tìm kiếm sản phẩm của bạn
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-5 cursor-pointer hover:bg-gray-50 px-4 py-2">
        <CircleStackIcon className="text-gray-600 h-12 w-12" />
        <div className="space-y-2">
          <p className="text-gray-600 text-xl font-semibold">
            Đấu giá cho sản phẩm
          </p>
          <p className="text-sm text-gray-500 font-light">
            Tham gia đấu giá ngay hoặc đợi đến lịch đôi giày được đấu giá và
            tham gia
          </p>
        </div>
      </div>

      <div className="flex flex-col space-y-5 cursor-pointer hover:bg-gray-50 px-4 py-2">
        <TruckIcon className="text-gray-600 h-12 w-12" />
        <div className="space-y-2">
          <p className="text-gray-600 text-xl font-semibold">
            Mang sản phẩm về nhà
          </p>
          <p className="text-sm text-gray-500 font-light">
            Chiến thắng sản phẩm, chọn phương thức vận chuyện và mang nó về nhà
          </p>
        </div>
      </div>
    </div>
  )
}

export default StepSection
