'use client';
import { useEffect, useState } from 'react';
import Spinner from '@/components/common/spinner/spinner';
import { columns } from '@/components/dashboard/payments/columns';
import { DataTable } from '@/components/dashboard/payments/data-table';
import { usePagination } from '@/app/api/usePagination';
import { TransactionResponse } from '@/app/api/paddle/types';
import { getTransactions } from '@/app/api/paddle/api'; // api call 

interface Props {
  subscriptionId: string;
}

export function PaymentsContent({ subscriptionId }: Props) {
  const { after, goToNextPage, goToPrevPage, hasPrev } = usePagination();

  const [transactionResponse, setTransactionResponse] = useState<TransactionResponse>({
    data: [],
    hasMore: false,
    totalRecords: 0,
    error: undefined,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getTransactions(subscriptionId, after);
      if (response) {
        setTransactionResponse(response);
      }
      setLoading(false);
    })();
  }, [subscriptionId, after]);

  if (!transactionResponse || transactionResponse.error) {
    return (<div>Something went wrong</div>)
  } else if (loading) {
    return (<Spinner />)
  }

  const { data: transactionData, hasMore, totalRecords } = transactionResponse;
  return (
    <div>
      <DataTable
        columns={columns}
        hasMore={hasMore}
        totalRecords={totalRecords}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        hasPrev={hasPrev}
        data={transactionData ?? []}
      />
    </div>
  );
}
