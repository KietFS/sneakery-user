import React, { useState } from 'react'

//styles
import Image from 'next/image'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { Tooltip } from '@mui/material'

interface IUploadImageProps {
  onSelect: (listImage: any[]) => void
}

const UploadImage: React.FC<IUploadImageProps> = props => {
  const [baseImage, setBaseImage] = useState<any[]>([])
  const [imgShow, setImgShow] = useState<any[]>([])
  const { onSelect } = props

  const uploadImage = async (e: any) => {
    const listFile = Object.values(e.target.files) as any[]
    const base64 = await Promise.all(
      listFile?.map(async file => await convertBase64(file)),
    )
    setBaseImage([...baseImage, listFile])
    onSelect(listFile)
    setImgShow(base64)
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

  const remove = (index: any) => {
    const temp = imgShow
    const cloned = temp
    cloned.splice(index, 1)
    setImgShow([...cloned])

    const temp2 = baseImage
    const cloned2 = temp2
    cloned2.splice(index, 1)
    setBaseImage([...cloned2])
  }

  return (
    <div className="w-full my-10">
      <p className="text-sm font-bold text-gray-600 mb-1">
        Chọn các ảnh khác cho sản phẩm
      </p>
      <input
        type="file"
        multiple
        onChange={e => uploadImage(e)}
        className="w-full  border-gray-200 border bg-gray-100 rounded-lg mt-1 h-10"
      />
      <div className="grid grid-cols-3 gap-x-2 w-fit">
        {imgShow.map((img, index) => (
          <div
            className="my-4 flex  flex-col border border-gray-200 shadow-lg w-[220px] h-[220px] p-1 rounded-lg cursor-pointer hover:opacity-80 items-center"
            key={index.toString()}
          >
            <Tooltip
              onClick={() => remove(index)}
              children={
                <XCircleIcon className="w-5 h-5 text-gray-400 hover:text-gray-800 float-right mb-2 " />
              }
              title="Xóa"
            />

            <Image src={img as any} width={200} height={150} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default UploadImage
