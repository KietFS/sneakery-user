import React, { useState } from 'react'

//design
import InputSearch from '@/designs/InputSearch'
import { Bars4Icon, UserIcon, UserPlusIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import UserCard from '../UserCard'

//store
import store, { IRootState } from '@/redux'
import { setCategory } from '@/redux/slices/filter'

//hooks
import { useRouter } from 'next/router'
import { useAppSelector } from '@/hooks/useRedux'
import { useDispatch } from 'react-redux'
import LoginDialog from '../LoginDialog'
import RegisterDialog from '../RegisterDialog'
import EmailSentDialog from '../EmailSentDialog'
import {
  setAuth,
  setOpenEmailSentDialog,
  setUser,
  setUserBalance,
} from '@/redux/slices/auth'
import axios from 'axios'
import { Config } from '@/config/api'
import { CategoryOutlined } from '@mui/icons-material'

interface IHeaderV2Props {}

const HeaderV2: React.FC<IHeaderV2Props> = props => {
  const { user, isAuth } = useAppSelector((state: IRootState) => state.auth)
  const router = useRouter()

  //state
  const [openLogin, setOpenLogin] = useState<boolean>(false)
  const [isGettingProductCategory, setIsGettingProductCategory] =
    useState<boolean>(false)
  const [displayMenu, setDisplayMenu] = useState<boolean>(false)
  const [categories, setCategories] = useState<IProductCategory[]>([])
  const [openRegister, setOpenRegister] = useState<boolean>(false)
  const { openEmailSentDialog } = useAppSelector(
    (state: IRootState) => state.auth,
  )
  const dispatch = useDispatch()

  React.useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem('user') as string)
    let balanceInfo = JSON.parse(localStorage.getItem('balanceInfo') as string)
    if (userInfo) {
      store.dispatch(setUser(userInfo))
      store.dispatch(setAuth(true))
    }
    if (balanceInfo) {
      store.dispatch(setUserBalance(balanceInfo?.balance))
    }

    getProductCategories()
  }, [])

  const getProductCategories = async () => {
    try {
      setIsGettingProductCategory(true)
      const response = await axios.get(`${Config.API_URL}/categories/`)

      if (response?.data?.success) {
        console.log('RESPONSE', response)
        setIsGettingProductCategory(false)
        setCategories(response?.data?.data)
      }
    } catch (error) {
      setIsGettingProductCategory(false)
    }
  }

  return (
    <div className="w-full shadow-lg pb-4 laptop:pb-0 ">
      <div className="w-full flex space-x-4 tablet:space-x-6 laptop:space-x-6 desktop:space-x-8 items-center px-4 py-4  justify-between laptop:justify-around">
        <div className="flex laptop:hidden  w-1/3 laptop:w-0">
          <div className="bg-gray-100 p-2 rounded-lg active:bg-gray-300">
            <Bars3Icon className="text-gray-500 font-bold w-5 h-5" />
          </div>
        </div>
        <p
          className="text-3xl font-bold text-blue-500 w-1/3 laptop:w-fit text-center cursor-pointer"
          onClick={() => router.push('/')}
        >
          Sneakery
        </p>
        <div className="flex w-1/3 laptop:hidden laptop:w-0 flex-row-reverse">
          {isAuth ? (
            <UserCard />
          ) : (
            <div className="flex flex-row-reverse laptop:hidden  w-1/3 laptop:w-0">
              <div className="p-2 rounded-full bg-gray-100 active:bg-gray-300 justify-center items-center flex">
                <UserIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="p-2 rounded-full bg-gray-100 active:bg-gray-300 justify-center items-center flex mr-2">
                <UserPlusIcon className="w-5 h-5 text-gray-600 mx-auto" />
              </div>
            </div>
          )}
        </div>
        <div className="laptop:w-[300px] desktop:w-[600px] hidden laptop:flex">
          <InputSearch />
        </div>
        <div className="laptop:flex justify-between items-center space-x-10 hidden">
          {/* {categories?.length > 0 &&
            categories?.map((category, categoryIndex) => (
              <p className="text-sm text-gray-600 font-semibold">
                {category?.name}
              </p>
            ))} */}

          <button
            className="flex items-center group-hover:text-blue-500 hover:text-blue-500"
            onMouseOver={() => setDisplayMenu(true)}
          >
            <Bars4Icon className="w-5 h-5 text-gray-600 mr-2 " />
            <p className="text-sm text-gray-600 font-semibold ">Danh mục</p>
          </button>

          <button className="flex items-center group-hover:text-blue-500 hover:text-blue-500">
            <ShoppingCartIcon className="w-5 h-5 text-gray-600 mr-2 " />
            <p className="text-sm text-gray-600 font-semibold">Giỏ hàng</p>
          </button>
        </div>
        <div className="hidden laptop:flex">
          {!!user ? (
            <UserCard />
          ) : (
            <div className="hidden laptop:flex flex-end space-x-0.5 items-center w-64">
              <button
                className="items-center rounded-xl px-4 py-2 text-center text-gray-600  text-sm w-fit flex hover:bg-gray-100"
                onClick={() => setOpenRegister(true)}
              >
                <UserPlusIcon className="w-5 h-5 text-gray-600 mr-1" />
                Đăng ký
              </button>
              <button
                className=" rounded-xl px-4 py-2 text-center text-gray-600  text-sm w-fit flex space-x-1 items-center hover:bg-gray-100"
                onClick={() => setOpenLogin(true)}
              >
                <UserIcon className="w-5 h-5 text-gray-600 mr-1" />
                Đăng nhập
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex laptop:hidden px-2">
        <InputSearch />
      </div>
      {openLogin ? (
        <LoginDialog
          isOpen={openLogin}
          onclickClose={() => setOpenLogin(false)}
        />
      ) : null}
      {openRegister ? (
        <RegisterDialog
          isOpen={openRegister}
          onClickClose={() => setOpenRegister(false)}
        />
      ) : null}

      {openEmailSentDialog ? (
        <EmailSentDialog
          open={openEmailSentDialog}
          onClose={() => dispatch(setOpenEmailSentDialog(false))}
        />
      ) : null}
      {displayMenu ? (
        <div
          className=" z-0 px-20 justify-center flex bg-blue-200 "
          onMouseLeave={() => setDisplayMenu(false)}
        >
          <div className="w-3/5 mx-auto  absolute top-20 mr-20 h-[200px] bg-white shadow-xl px-4 z-50  py-4 grid grid-cols-4 grid-row-4 flex-wrap gap-y-2">
            {categories?.map((category, categoryIndex) => (
              <button className="h-fit">
                <p className="text-gray-600 text-xs text-left hover:text-blue-500 ">
                  {category?.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default HeaderV2
