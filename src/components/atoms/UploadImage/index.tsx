import React, { useState } from 'react'

//styles
import Image from 'next/image'
import { Tooltip } from '@mui/material'
import { XCircleIcon } from '@heroicons/react/20/solid'

interface IUploadImageProps {
  onSelect: (listImage: any[]) => void
  required?: boolean
}

const UploadImage: React.FC<IUploadImageProps> = props => {
  const { onSelect, required = false } = props
  const [baseImage, setBaseImage] = useState<any[]>([])
  const [imgShow, setImgShow] = useState<any[]>([])

  const uploadImage = async (e: any) => {
    const file = e.target.files[0]
    const base64 = await convertBase64(file)

    onSelect([...baseImage, file])
    setBaseImage([...baseImage, file])
    setImgShow([...imgShow, base64])
  }

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = error => {
        reject(error)
      }
    })
  }

  return (
    <div className="w-full">
      <div className="flex items-center">
        <p className="text-sm font-bold text-gray-600 mb-1 mr-1">
          Chọn thumbnail cho sản phẩm
        </p>
        <p className="text-sm font-bold text-red-500 ">*</p>
      </div>
      <input
        value=""
        type="file"
        onChange={e => uploadImage(e)}
        className="w-full  border-gray-200 border bg-gray-100 rounded-lg mt-1 h-10"
      />
      <div className="my-4 flex flex-col border border-gray-200 shadow-lg w-[210px] h-[210px] p-1 justify-center rounded-lg cursor-pointer hover:opacity-80 items-center">
        {imgShow.length !== 0 && (
          <Tooltip
            onClick={() => {
              setImgShow([])
              setBaseImage([])
            }}
            children={
              <XCircleIcon className="w-5 h-5 text-gray-400 hover:text-gray-800 float-right mb-2 " />
            }
            title="Xóa"
          />
        )}

        {imgShow.length === 0 ? (
          <p className="text-gray-500 font-bold text-lg mx-auto text-center">
            Vui lòng chọn ảnh
          </p>
        ) : (
          <Image src={imgShow[0] as any} width={200} height={150} />
        )}
      </div>
    </div>
  )
}

export default UploadImage
