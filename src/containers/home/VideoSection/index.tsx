import React from 'react'

interface IVideoSectionProps {}

const VideoSection: React.FC<IVideoSectionProps> = props => {
  return (
    <div className="px-10 py-5 bg-blue-50 w-full h-fit flex flex-col laptop:flex-row justify-between items-center space-y-10 laptop:space-y-0 laptop:space-x-5">
      <div className="w-11/12 laptop:w-1/2 space-y-2">
        <h2 className="text-gray-600 font-bold">
          Sneakery- Về cách hoạt động của chúng tôi
        </h2>
        <p className="text-gray-400 font-normal text-lg">
          Video bên đây sẽ mô tả quá trình từ khi đấu giá cho đến lúc về được
          tay bạn. Lorem ipsum dolor sit amet consectetur adipisicing elit. quam
          sunt, voluptate voluptatum ipsa?
        </p>
      </div>
      <div className="w-11/12 laptop:w-1/2 flex-row-reverse flex">
        <iframe
          className="w-full h-72"
          src="https://www.youtube.com/embed/cHqV9uFVcJo"
        ></iframe>
      </div>
    </div>
  )
}

export default VideoSection
