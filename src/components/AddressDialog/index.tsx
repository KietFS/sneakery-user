import * as React from 'react'

//styles
import Dialog from '@mui/material/Dialog'
import { DialogContent } from '@mui/material'

//utils and types
import AddressForm from '../AddressForm'

export interface IAddressDialogProps {
  open: boolean
  onClose: () => void
}

function AddressDialog(props: IAddressDialogProps) {
  //props
  const { open, onClose } = props

  return (
    <Dialog
      onClose={onClose}
      open={open}
      className="rounded-lg"
      maxWidth="md"
      fullWidth={true}
    >
      <DialogContent>
        <AddressForm onCloseButton={() => onClose()} />
      </DialogContent>
    </Dialog>
  )
}

export default AddressDialog
