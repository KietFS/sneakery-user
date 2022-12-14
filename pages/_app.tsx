import * as React from "react";

// 1. import `NextUIProvider` component

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/Home.module.css";
import "../utils/prototype";
import store from "../redux";
import NProgress from "nprogress";
import Router from "next/router";
import { setAuth, setUser } from "../redux/slices/auth";

import type {} from "@mui/x-date-pickers/themeAugmentation";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { createTheme } from "@mui/material";

function App({ Component, pageProps }: AppProps) {
  // 2. Use at the root of your app

  Router.events.on("routeChangeStart", (url) => {
    console.log(`Loading: ${url}`);
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  React.useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("user") as string);
    if (userInfo) {
      store.dispatch(setUser(userInfo));
      store.dispatch(setAuth(true));
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        {/* Same as */}
        <ToastContainer />
        <Component {...pageProps} />
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
