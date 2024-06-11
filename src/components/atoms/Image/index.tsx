import { ImageProps } from 'next/image'
import Image from 'next/image'
import React from 'react'
import PlaceholderImage from '@/assets/images/ImagePlaceholder.jpeg'

interface IBaseImageProps extends ImageProps {}

const BaseImage: React.FC<IBaseImageProps> = props => {
  const [isError, setIsError] = React.useState<boolean>(false)
  return (
    <>
      {isError ? (
        <Image {...props} src={PlaceholderImage} />
      ) : (
        <Image {...props} />
      )}

      <div className="w-0 h-0">
        <Image
          src={props.src}
          onError={() => setIsError(true)}
          className="invisible w-0 h-0"
          width={0}
          height={0}
        />
      </div>
    </>
  )
}

export default BaseImage
