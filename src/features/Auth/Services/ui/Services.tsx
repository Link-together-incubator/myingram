'use client'

import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import s from './Services.module.scss'

function GoogleAuthButton() {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const jwtToken = tokenResponse.access_token
      console.log('jwtToken', jwtToken)
      await fetch(`${process.env.NEXT_PUBLIC_URL_API}auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: jwtToken }),
      })
    },
    onError: () => {
      console.error('Google login failed')
    },
    flow: 'implicit',
  })

  return (
    <button type="button" onClick={() => login()}>
      <Image
        src="/assets/svg/google.svg"
        width={36}
        height={36}
        alt="Google Icon"
      />
    </button>
  )
}

export function Services() {
  const router = useRouter()

  const handleGitHubLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
    const redirectUrl = process.env.NEXT_PUBLIC_URL_API + 'auth/github/callback'
    const githubLogin = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=user:email`
    router.push(githubLogin)
  }

  return (
    <div className={s.imageWrapper}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <GoogleAuthButton />
      </GoogleOAuthProvider>

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
