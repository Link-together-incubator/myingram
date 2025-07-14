'use client'

import { useState } from 'react'

import { useGetSubscriptionsQuery } from '@/features/Payments/api/apiPayments'
import { ChangeSubscription } from '@/features/Payments/ui/AccountManagement/ChangeSubscription/ChangeSubscription'
import { CurrentSubscription } from '@/features/Payments/ui/AccountManagement/CurrentSubscription/CurrentSubscription'
import { Card, Checkbox } from '@/shared/ui'

import s from './AccountManagement.module.scss'

export const AccountManagement = () => {
  const { data: subscription } = useGetSubscriptionsQuery(undefined)
  const [checkboxPersonal, setCheckboxPersonal] = useState(true)
  const [checkboxBusiness, setCheckboxBusiness] = useState(false)

  const handelChangeCheckboxPersonal = () => {
    setCheckboxPersonal(true)
    setCheckboxBusiness(false)
  }

  const handelChangeCheckboxBusiness = () => {
    setCheckboxPersonal(false)
    setCheckboxBusiness(true)
  }

  const now = new Date()
  const expire = subscription?.items[0].expiresAt

  return (
    <div className={s.accountManagementWrapper}>
      {expire && new Date(expire) >= now && <CurrentSubscription />}
      <h3 className={s.title}>Account type:</h3>
      <Card id={'ToggleAccountType'} title={''} className={s.cardAccountType}>
        <Checkbox
          id={'Personal'}
          label={'Personal'}
          checked={checkboxPersonal}
          className={s.CheckboxPersonal}
          onCheckedChange={handelChangeCheckboxPersonal}
        />
        <Checkbox
          id={'Business'}
          label={'Business'}
          checked={checkboxBusiness}
          className={s.CheckboxBusiness}
          onCheckedChange={handelChangeCheckboxBusiness}
        />
      </Card>
      {checkboxBusiness && <ChangeSubscription />}
    </div>
  )
}
