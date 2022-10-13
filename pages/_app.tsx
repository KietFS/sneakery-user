import * as React from "react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";

import { AppProps } from "next/app";
import "../styles/globals.css";
import store from "../redux";

function App({ Component }: AppProps) {
  // 2. Use at the root of your app
  return (
    <NextUIProvider>
      <Provider store={store}>
        <Component />
      </Provider>
    </NextUIProvider>
  );
}

export default App;
