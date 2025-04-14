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
  function loginWithGoogle() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    const redirectUri = encodeURIComponent(
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT!,
    )
    const scope = encodeURIComponent('openid profile email')

    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `response_type=id_token&` +
      `scope=${scope}&` +
      `nonce=${Math.random().toString(36).substring(2)}`

    router.push(authUrl)
  }

  return (
    <div className={s.imageWrapper}>
      <button type="button" onClick={loginWithGoogle}>
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
