import { Eye, EyeClosed, Search } from 'lucide-react'
import { useState } from 'react'

import s from './Input.module.scss'

type InputType =
  | 'default'
  | 'email'
  | 'search'
  | 'password'
  | 'username'
  | 'passwordConfirmation'

const placeholders: Record<InputType, string> = {
  default: '',
  email: 'Epam@epam.com',
  search: 'Input search',
  password: '*****************',
  passwordConfirmation: '*****************',
  username: 'Enter your username',
}

const labels: Record<InputType, string> = {
  default: '',
  email: 'Email',
  search: '',
  password: 'Password',
  passwordConfirmation: 'Password confirmation',
  username: 'Username',
}

type InputProps = {
  type?: InputType
  error?: string | null
  disabled?: boolean
}

export const Input = ({ type = 'default', error, disabled }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className={s.wrapper}>
      <label className={s.label}>{labels[type]}</label>
      <div
        className={`${s.inputWrapper} ${type === 'search' ? s.searchInputWrapper : ''}`}
      >
        {type === 'search' && <Search className={s.searchIcon} size={20} />}
        <input
          className={`${s.input} ${error ? s.error : ''} `}
          type={
            (type === 'password' || type === 'passwordConfirmation') &&
            !showPassword
              ? 'password'
              : 'text'
          }
          placeholder={placeholders[type]}
          disabled={disabled}
        />
        {(type === 'password' || type === 'passwordConfirmation') && (
          <button
            onClick={togglePassword}
            className={`${s.eyeButton} ${disabled ? s.disabled : ''}`}
            disabled={disabled}
          >
            {showPassword ? <EyeClosed size={24} /> : <Eye size={24} />}
          </button>
        )}
      </div>
      {error && <span className={s.errorText}>{error}</span>}
    </div>
  )
}
