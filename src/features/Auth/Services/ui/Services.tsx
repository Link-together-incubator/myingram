'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import s from './Services.module.scss'

export function Services() {
  const router = useRouter()

  const handleGitHubLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
    const redirectUrl = process.env.NEXT_PUBLIC_URL_API + 'auth/github/callback'
    const githubLogin = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=user:email`

    router.push(githubLogin)
  }

  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    // const redirectUri = 'https://myin-gram.ru/api/v1/auth/google/callback' ??
    const responseType = 'code'
    const scope = 'openid email profile'
    const redirectUrl = 'https://myin-gram.ru/'
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUrl}&scope=${encodeURIComponent(scope)}`
    router.push(googleAuthUrl)
    // да я хрен знает что здесь делать
  }
  return (
    <div className={s.imageWrapper}>
      <button type="button" onClick={handleGoogleLogin}>
        <Image
          src="/assets/svg/google.svg"
          width={36}
          height={36}
          alt="Google Icon"
        />
      </button>
      <button type="button" onClick={handleGitHubLogin}>
        <Image
          src="/assets/svg/github.svg"
          width={36}
          height={36}
          alt="Github Icon"
        />
      </button>
    </div>
  )
}
