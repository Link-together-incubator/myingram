import React, { Fragment } from 'react'

import { fetchCountRegisteredUsers } from '@/features/RegisteredUsers'

import s from './RegisteredUsers.module.scss'

export const RegisteredUsers = async () => {
  try {
    const totalCount = await fetchCountRegisteredUsers()
    const numbersArray = totalCount.toString().split('') || []

    while (numbersArray.length < 6) {
      numbersArray.unshift('0')
    }

    return (
      <div className={s.registeredUsers}>
        <div>Registered users:</div>
        <div className={s.counter}>
          {numbersArray.map((num, i) => (
            <Fragment key={`${num}${i}`}>
              {num}
              {i !== numbersArray.length - 1 && <div className={s.separator} />}
            </Fragment>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.warn('Registered users fetch failed.', error)

    return (
      <div className={s.registeredUsers}>
        Registered users: <span>Error load data</span>
      </div>
    )
  }
}
