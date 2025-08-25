'use client'
import Image from 'next/image'
import { useState } from 'react'

import { useSubscribeMutation } from '@/features/Payments/api/apiPayments'
import { Sub } from '@/features/Payments/api/payments.types'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { setAppAlert } from '@/shared/model/appSlice'
import { Card, Checkbox } from '@/shared/ui'

import s from './ChangeSubscription.module.scss'

export const ChangeSubscription = () => {
  const dispatch = useAppDispatch()
  const [subscribe, { isLoading }] = useSubscribeMutation()
  const [selectedSubscription, setSelectedSubscription] = useState<number>(1)
  const [subscribeType, setSubscribeType] = useState<Sub>({ subscribeType: 1 })
  const subscriptionOptions = [
    { id: 'day', label: '$10 per 1 day', type: 1 },
    { id: 'week', label: '$50 per 7 days', type: 2 },
    { id: 'month', label: '$100 per month', type: 3 },
  ]

  const handleCheckboxChange = (type: number) => {
    setSelectedSubscription(type)
    setSubscribeType({ subscribeType: type })
  }

  const handelPayPal = () => {
    dispatch(
      setAppAlert({
        message: 'Here Will Be Paypal Payment Soon',
        type: 'classic',
      }),
    )
  }
  const handleStripe = async () => {
    try {
      const response = await subscribe(subscribeType).unwrap()
      if (response.url) {
        window.location.href = response.url
      } else {
        dispatch(
          setAppAlert({
            message: 'Payment URL not found in response',
            type: 'error',
          }),
        )
      }
    } catch (err) {
      dispatch(
        setAppAlert({
          message: typeof err === 'string' ? err : 'Error while subscribing',
          type: 'error',
        }),
      )
    }
  }
  return (
    <>
      <h3 className={s.title}>Change your subscription:</h3>
      <Card
        id={'ChangeSubscriptionType'}
        title={''}
        className={s.changeSubscription}
      >
        {subscriptionOptions.map((option) => (
          <Checkbox
            key={option.id}
            id={option.id}
            label={option.label}
            checked={selectedSubscription === option.type}
            className={
              s[
                `Checkbox${option.id.charAt(0).toUpperCase() + option.id.slice(1)}`
              ]
            }
            onCheckedChange={() => handleCheckboxChange(option.type)}
          />
        ))}
      </Card>
      <div className={s.payPalOrStripe}>
        <Card id={'PayPal'} title={''} className={s.payPal}>
          <button
            type="button"
            onClick={handelPayPal}
            aria-label={'PayPal'}
            className={s.payPalButton}
          >
            <Image
              src="/assets/svg/paypal.svg"
              width={96}
              height={64}
              alt="PayPall Icon"
            />
          </button>
        </Card>
        <span className={s.separator}>Or</span>
        <Card id={'Stripe'} title={''} className={s.stripe}>
          <button
            type="button"
            onClick={handleStripe}
            aria-label={'Stripe'}
            disabled={isLoading}
            className={s.stripeButton}
          >
            <Image
              src="/assets/svg/stripe.svg"
              width={96}
              height={64}
              alt="Stripe Icon"
            />
          </button>
        </Card>
      </div>
    </>
  )
}
