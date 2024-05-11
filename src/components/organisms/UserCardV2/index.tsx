import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { useAppSelector } from '@/hooks/useRedux'
import { IRootState } from '@/redux'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import PostedDialog from '@/components/templates/PostedDialog'

interface IUserCardV2Props {}

const UserCardV2: React.FC<IUserCardV2Props> = props => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const [openAddressDialog, setOpenAddressDialog] =
    React.useState<boolean>(false)
  const [openAccountDialog, setOpenAccountDialog] =
    React.useState<boolean>(false)
  const [openOrderHistory, setOpenOrderHistory] = React.useState<boolean>(false)
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState<boolean>(false)
  const [openPostedDialog, setOpenPostedDialog] = React.useState<boolean>(false)
  const [openWinningDialog, setOpenWinningDialog] =
    React.useState<boolean>(false)
  const { user } = useAppSelector((state: IRootState) => state.auth)

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <React.Fragment>
        <Box
          sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
        >
          <Tooltip title="Account settings">
            <button
              onClick={handleClick}
              className="flex justify-between items-center py-1 px-4 rounded-md border border-blue-500"
            >
              <p className="w-8 h-8 p-2 rounded-full  border-1 border-gray-200 bg-blue-500 text-white font-semibold items-center justify-center flex text-lg mr-2">
                {user?.username?.[0].toUpperCase()}
              </p>

              <p className="text-gray-600 font-semibold hidden laptop:flex">
                {user?.username || 'Tuan Kiet'}
              </p>

              <ChevronDownIcon
                width={20}
                height={20}
                className="text-gray-600 ml-2"
              />
            </button>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            sx={{ display: 'flex', alignItems: 'center' }}
            onClick={handleClose}
          >
            <p className="text-gray-500 text-sm ">Thông tin tài khoản</p>
            <UserIcon className="h-5 w-5 text-gray-500" />
          </MenuItem>

          <MenuItem
            sx={{ display: 'flex', alignItems: 'center' }}
            onClick={handleClose}
          >
            <div
              className="py-2 px-4 cursor-pointer flex justify-between items-center"
              onClick={() => {
                setOpenAddressDialog(true)
              }}
            >
              <p className="text-gray-500 text-sm ">Quản lý địa chỉ</p>
              <MapPinIcon className="h-5 w-5 text-gray-500" />
            </div>
          </MenuItem>

          <MenuItem
            sx={{ display: 'flex', alignItems: 'center' }}
            onClick={() => {
              setOpenWinningDialog(true)
              handleClose()
            }}
          >
            <div className="py-2 px-4 cursor-pointer flex justify-between items-center">
              <p className="text-gray-500 text-sm ">Sản phẩm đã thắng</p>
              <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
            </div>
          </MenuItem>

          <MenuItem
            sx={{ display: 'flex', alignItems: 'center' }}
            onClick={() => {
              setOpenPostedDialog(true)
            }}
          >
            <div className="py-2 px-4 cursor-pointer flex justify-between items-center">
              <p className="text-gray-500 text-sm ">Sản phẩm đã đăng</p>
              <ClipboardDocumentListIcon className="h-5 w-5 text-gray-500" />
            </div>
          </MenuItem>
        </Menu>
      </React.Fragment>
      {openPostedDialog ? (
        <PostedDialog
          open={openPostedDialog}
          onClose={() => setOpenPostedDialog(false)}
        />
      ) : null}
    </>
  )
}

export default UserCardV2
