import { baseApi } from '@/shared/api/baseApi'

import {
  Sub,
  Unsub,
  SubResponse,
  SubscriptionsResponse,
  SubscriptionsQueryParams,
} from './payments.types'

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation<SubResponse, Sub>({
      query: (subscribeType) => ({
        url: 'payments/subscribe',
        method: 'POST',
        body: subscribeType,
      }),
      invalidatesTags: [{ type: 'Subscription', id: 'LIST' }],
    }),
    getSubscriptions: builder.query<
      SubscriptionsResponse,
      Partial<SubscriptionsQueryParams> | undefined
    >({
      query: (params = {}) => {
        const {
          pageNumber = 1,
          pageSize = 10,
          sortBy = 'createdAt',
          sortDirection = 'DESC',
        } = params
        return {
          url: 'payments/subscriptions',
          method: 'GET',
          params: { pageNumber, pageSize, sortBy, sortDirection },
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ subscriptionId }) => ({
                type: 'Subscription' as const,
                id: subscriptionId,
              })),
              { type: 'Subscription', id: 'LIST' },
            ]
          : [{ type: 'Subscription', id: 'LIST' }],
    }),
    unsubscribe: builder.mutation<void, Unsub>({
      query: (paymentId) => ({
        url: 'payments/unsubscribe',
        method: 'POST',
        body: paymentId,
      }),
    }),
  }),
})

export const {
  useUnsubscribeMutation,
  useSubscribeMutation,
  useGetSubscriptionsQuery,
} = paymentsApi
