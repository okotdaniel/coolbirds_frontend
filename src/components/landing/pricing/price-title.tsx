import { Tier } from '@/components/landing/pricing/price-tier';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  tier: Tier;
}

export function PriceTitle({ tier }: Props) {
  const { name, featured, icon } = tier;
  return (
    <div
      className={cn('flex justify-between items-center px-8 pt-8', { 'featured-price-title': featured, })} >
      <div className={'flex items-center gap-[10px]'}>
       
        <p className={'text-[20px] leading-[30px] font-semibold'}>{name}</p>
      </div>
      {featured && (
        <div className={ 'flex items-center px-3 py-1 rounded-xs border border-secondary-foreground/10 text-[14px] h-[29px] leading-[21px] featured-card-badge' } >
          Most popular
        </div>
      )}
    </div>
  );
}
