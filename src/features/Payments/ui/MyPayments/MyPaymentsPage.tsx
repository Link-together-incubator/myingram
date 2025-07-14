'use client'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { useGetSubscriptionsQuery } from '@/features/Payments/api/apiPayments'
import {
  SubscriptionType,
  PaymentType,
  Payment,
} from '@/features/Payments/ui/MyPayments/columns'
import ColumnsWrapper from '@/features/Payments/ui/MyPayments/ColumnsWrapper'
import SkeletonTable from '@/features/Payments/ui/MyPayments/SkeletonTable/SkeletonTable'

const MyPayments = dynamic(
  () =>
    import('@/features/Payments/ui/MyPayments/MyPayments').then(
      (mod) => mod.MyPayments,
    ),
  {
    ssr: false,
  },
)

export default function MayPaymentsPage() {
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'DESC' as 'ASC' | 'DESC',
  })
  const {
    data: subscriptions,
    isLoading,
    isError,
  } = useGetSubscriptionsQuery(pagination)
  if (isLoading) {
    return <SkeletonTable />
  }

  if (isError || !subscriptions?.items) {
    return <div>Error loading subscriptions.</div>
  }
  const formattedData: Payment[] = subscriptions.items.map((item) => ({
    dateOfPayment: new Date(item.createdAt),
    endDateToSubscription: new Date(item.expiresAt),
    price: item.amount,
    subscriptionType: item.subType as SubscriptionType,
    paymentType: item.payType as PaymentType,
  }))

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, pageNumber: newPage }))
  }

  const handlePageSizeChange = (newSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize: newSize, pageNumber: 1 }))
  }

  return (
    <div>
      {/*<Suspense fallback={<div>Loading table...</div>}>*/}
      <ColumnsWrapper>
        {({ columns }) => (
          <MyPayments
            columns={columns}
            data={formattedData}
            pagination={pagination}
            totalPages={subscriptions.pagesCount || 0}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </ColumnsWrapper>
      {/*</Suspense>*/}
    </div>
  )
}
