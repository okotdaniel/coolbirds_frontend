'use client'

import { MarketingHeader } from "@/components/landing/marketing-header"
import { MarketingFooter } from "@/components/landing/marketing-footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for styling


interface Props {
     children: React.ReactNode; 
} 

export default function AuthenticationLayout( { children }: Props) {
	return (
        
          <div>
              <ToastContainer />
              <MarketingHeader />
                  {children}
              <MarketingFooter />
          </div>
       
	);
}

