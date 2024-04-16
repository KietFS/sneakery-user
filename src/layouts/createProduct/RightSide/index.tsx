import React from 'react'

//utils
import AddressForm from '@/components/templates/AddressForm'

interface ILeftSideProps {}

const RightSide: React.FC<ILeftSideProps> = props => {
  return (
    <div className="bg-white border-gray-200 border rounded-xl h-full p-4">
      <AddressForm onCloseButton={() => {}} />
    </div>
  )
}

export default RightSide
