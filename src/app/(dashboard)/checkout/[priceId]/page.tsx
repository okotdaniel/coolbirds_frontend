import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
// import '../../../styles/checkout.css';
import { CheckoutContents } from '@/components/landing/checkout/checkout-contents';
import { CheckoutGradients } from '@/components/landing/gradients/checkout-gradients';


export default async function CheckoutPage() {
  return (
    <div className={'w-full min-h-screen relative overflow-hidden'}>
      {/* <CheckoutGradients /> */}
        <div className={'mx-auto max-w-6xl relative px-[16px] md:px-[32px] py-[24px] flex flex-col gap-6 justify-between'} >
          <div className={'flex gap-4'}>
            <Link href={'/'}>
              <Button variant={'secondary'} className={'h-[32px] bg-[#182222] border-border w-[32px] p-0 rounded-[4px]'}>
                <ChevronLeft />
              </Button>
            </Link>
          <Image src={'/logo.svg'} alt={'Cool Birds'} width={131} height={28} />
        </div>
        <CheckoutContents userEmail={'daniel@daniel.com'} />
      </div>
    </div>
  );
}

