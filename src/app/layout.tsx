
'use client'

import type React from "react"
import { MarketingHeader } from "@/app/marketing/marketing-header"
import { MarketingFooter } from "@/app/marketing/marketing-footer"



import { Geist, Geist_Mono } from "next/font/google";
import { Setup } from '@/lib/api/authentication/utils';
import './globals.css';
// import Provider from '@/lib/redux/provider/storeProvider';
import { Provider } from 'react-redux'
import { store } from "@/lib/redux/store/stores";

  
  const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
  });
  

  interface Props {
    children: React.ReactNode; 
} 

export default function RootLayout({ children, }: Props) {
  return (
    <html lang='en'>
    <body >
      <Provider store={store}>
          <Setup />

          <div>
            {/* <MarketingHeader /> */}
            <main>{children}</main>
            {/* <MarketingFooter /> */}
          </div>

          </Provider>
			</body>
		</html>
  )
}
