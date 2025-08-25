import Link from 'next/link'

import s from '../paymentsPage.module.scss'

const SuccessPage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.header}>Payment Successful!</h1>
      <p>
        Go to{' '}
        <Link className={s.link} href="/profile-info/my-payments">
          Profile Settings
        </Link>{' '}
        to check your subscription status.
      </p>
    </div>
  )
}
export default SuccessPage
