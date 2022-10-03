import * as React from "react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { AppProps } from "next/app";
import "../styles/globals.css";

function App({ Component }: AppProps) {
  // 2. Use at the root of your app
  return (
    <NextUIProvider>
      <Component />
    </NextUIProvider>
  );
}

export default App;
