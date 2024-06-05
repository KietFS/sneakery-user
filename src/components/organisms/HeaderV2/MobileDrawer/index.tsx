import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { useAppSelector } from '@/hooks/useRedux'
import { IRootState } from '@/redux'

interface IMobileDrawerProps {
  open: boolean
  setOpen: (value: boolean) => void
}

const MobileDrawer: React.FC<IMobileDrawerProps> = props => {
  const { open, setOpen } = props
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }
  const { currentCategory, listCategory } = useAppSelector(
    (state: IRootState) => state.category,
  )

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      toggleDrawer(false)
    })
  }, [])

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Đăng nhập, Đăng ký'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <p className="text-gray-600 font-bold text-xl px-4 py-2">Các danh mục</p>
      <List>
        {listCategory?.map((item: any, index: number) => (
          <ListItem key={index.toString()} disablePadding>
            <ListItemButton>
              <ListItemText primary={item?.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}

export default MobileDrawer
