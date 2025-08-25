'use client'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useState } from 'react'

import { useGetSubscriptionsQuery } from '@/features/Payments/api/apiPayments'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { setAppAlert } from '@/shared/model/appSlice'
import { Card } from '@/shared/ui/Card/Card'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'

import s from './CurrentSubscription.module.scss'

export const CurrentSubscription = () => {
  const dispatch = useAppDispatch()
  const { data: currentSubscription } = useGetSubscriptionsQuery(undefined)
  const [isChecked, setIsChecked] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('autoRenewalEnabled') ?? 'false'
    return JSON.parse(storedValue)
  })

  const saveCheckboxState = (value: boolean) => {
    try {
      localStorage.setItem('autoRenewalEnabled', JSON.stringify(value))
    } catch (err) {
      dispatch(
        setAppAlert({
          message:
            typeof err === 'string' ? err : 'Failed to save to localStorage:',
          type: 'error',
        }),
      )
    }
  }

  if (!currentSubscription?.items[0]) {
    return
  }

  const expiresAt = currentSubscription.items[0].expiresAt
  const expireDate = new Date(expiresAt)

  const [day, month, year] = expireDate
    .toLocaleDateString()
    .split('.')
    .map(Number)
  const nextPaymentDate = new Date(year, month - 1, day)
  nextPaymentDate.setDate(nextPaymentDate.getDate() + 1)
  const nextPayment = nextPaymentDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const handlerAutoRenewalChange = (checked: CheckedState) => {
    if (typeof checked === 'boolean') {
      setIsChecked(checked)
      saveCheckboxState(checked)
    }
  }

  return (
    <div className={s.currentSubscriptionWrapper}>
      <h3 className={s.labelSubscription}>Current Subscription:</h3>
      <Card id={'1'} title={''} className={s.currentSubscription}>
        <div className={s.colonWrapper}>
          <div className={s.expire}>
            <span className={s.spanExpire}>Expire at</span>
            <span>{expireDate.toLocaleDateString()}</span>
          </div>
          <div className={s.nextPayment}>
            <span className={s.spanNextPayment}>next payment</span>
            <span>{nextPayment}</span>
          </div>
        </div>
      </Card>
      <Checkbox
        id={'2'}
        label={'Auto-Renewal'}
        checked={isChecked}
        onCheckedChange={handlerAutoRenewalChange}
      ></Checkbox>
    </div>
  )
}
