import * as React from 'react'

import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/Home.module.css'
import '../utils/prototype'

import NProgress from 'nprogress'
import Router from 'next/router'

import type {} from '@mui/x-date-pickers/themeAugmentation'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { persistor, store } from '@/redux'
import { PersistGate } from 'redux-persist/integration/react'

function App({ Component, pageProps }: AppProps) {
  // 2. Use at the root of your app

  Router.events.on('routeChangeStart', url => {
    NProgress.start()
  })
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Component {...pageProps} />
        </Provider>
      </PersistGate>
    </LocalizationProvider>
  )
}

export default App
