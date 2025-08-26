'use client'

import { ColumnDef } from '@tanstack/react-table'

export type SubscriptionType =
  | '$10 per 1 Day'
  | '$50 per 7 Day'
  | '$100 per 1 month'
export type PaymentType = 'Stripe' | 'Paypal'

export type Payment = {
  dateOfPayment: Date
  endDateToSubscription: Date
  price: number
  subscriptionType: SubscriptionType
  paymentType: PaymentType
}
const formatDate = (date: Date) => date.toLocaleDateString()

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'dateOfPayment',
    header: 'Date Of Payment',
    cell: ({ row }) => formatDate(row.original.dateOfPayment),
  },
  {
    accessorKey: 'endDateToSubscription',
    header: 'End Date To Subscription',
    cell: ({ row }) => formatDate(row.original.endDateToSubscription),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => `$${row.original.price}`,
  },
  {
    accessorKey: 'subscriptionType',
    header: 'Subscription Type',
    cell: ({ row }) => row.original.subscriptionType?.split(' per ')[1],
  },
  {
    accessorKey: 'paymentType',
    header: 'Payment Type',
    cell: ({ row }) => row.original.paymentType,
  },
] as ColumnDef<Payment>[]
