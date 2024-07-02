import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import { IProductDetail } from '@/types'

interface ILeftSideProps {
  product?: IProductDetail
}

const LeftSide: React.FC<ILeftSideProps> = ({ product }) => {
  const [isMobile, setIsMobile] = useState(false)
  const sliderRef = useRef(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true, // This makes the slider adapt to the image height
  }

  const imageStyle = {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'contain',
  }

  // Thêm style cho thumbnail
  const thumbnailStyle = {
    width: '120px',
    height: '90px',
    objectFit: 'contain',
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700)
    window.addEventListener('resize', handleResize)
    handleResize() // Initial check
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="border-r border-gray-200 h-full py-8 px-4 ">
      <Slider ref={sliderRef} {...settings} className="rounded-lg mx-auto">
        {product?.imagePath?.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
            className="rounded-lg cursor-pointer hover:opacity-80 w-full justify-center flex"
          >
            <div className="flex min-h-[270px] max-h-[360px] w-auto justify-center">
              <img
                src={item}
                alt={`Product image ${index + 1}`}
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'contain',
                }} // Áp dụng style cho hình ảnh chính
              />
            </div>
          </div>
        ))}
      </Slider>
      <div className="grid grid-cols-4 gap-x-5 mt-20">
        {product?.imagePath?.map((item, index) => (
          <div
            key={index}
            className="p-2 border border-gray-200 rounded-xl cursor-pointer hover:opacity-50"
            onClick={() => (sliderRef.current as any)?.slickGoTo(index)}
          >
            <img
              src={item}
              alt={`Thumbnail ${index + 1}`}
              style={{ width: '120px', height: '90px', objectFit: 'contain' }} // Áp dụng style cho thumbnail
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeftSide
