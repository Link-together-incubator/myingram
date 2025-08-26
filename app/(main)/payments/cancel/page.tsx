import Link from 'next/link'

import s from '../paymentsPage.module.scss'

const CancelPage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.header}>Payment Cancelled</h1>
      <p>
        Your payment was not completed. You can try again later or go back to{' '}
        <Link className={s.link} href="/profile-info/my-payments">
          Profile Settings
        </Link>{' '}
        {``} to manage your subscription.
      </p>
    </div>
  )
}

export default CancelPage
