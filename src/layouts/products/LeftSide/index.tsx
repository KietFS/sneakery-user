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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700)
    window.addEventListener('resize', handleResize)
    handleResize() // Initial check
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="border-r border-gray-200 h-full py-8 px-4">
      <Slider ref={sliderRef} {...settings} className="rounded-lg mx-auto">
        {product?.imagePath?.map((item, index) => (
          <div
            key={index}
            className="rounded-lg cursor-pointer hover:opacity-80 w-full justify-center flex"
          >
            <img
              src={item}
              alt={`Product image ${index + 1}`}
              className="w-full max-w-[400px] max-h-[400px] h-auto rounded-lg mx-auto"
            />
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
              width={120}
              height={90}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeftSide
