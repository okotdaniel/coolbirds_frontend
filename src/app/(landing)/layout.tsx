
'use client'

import type React from "react"
import { MarketingHeader } from "@/components/landing/marketing-header"
import { MarketingFooter } from "@/components/landing/marketing-footer"

import { Geist, Geist_Mono } from "next/font/google";
import { Setup } from '@/lib/api/authentication/utils';
// import Provider from '@/lib/redux/provider/storeProvider';
import { Provider } from 'react-redux'
import { store } from "@/lib/redux/store/stores";
  
interface Props{ 
  children: React.ReactNode
}

export default function MarketingLayout({ children,}: Props) {
  return (
    
          <div className="flex flex-col  justify-center items-center ">
            <MarketingHeader />
            {children}
            <MarketingFooter />
          </div>
		
  )
}
