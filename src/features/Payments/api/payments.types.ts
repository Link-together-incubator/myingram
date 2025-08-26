import {
  PaymentType,
  SubscriptionType,
} from '@/features/Payments/ui/MyPayments/columns'

export type Sub = {
  subscribeType: number
}

export type Unsub = {
  paymentId: string
}

export type SubResponse = {
  url: string
}

export type SubscriptionsItem = {
  id: string
  userId: string
  subscriptionId: string
  createdAt: string
  expiresAt: string
  deletedAt: string
  payType: PaymentType
  subType: SubscriptionType
  status: string
  amount: number
}

export type SubscriptionsResponse = {
  items: SubscriptionsItem[]
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
}

export type SubscriptionsQueryParams = {
  pageNumber: number
  pageSize: number
  sortBy: string
  sortDirection: 'DESC' | 'ASC'
}
