import { Eye, EyeClosed, Search } from 'lucide-react'
import { useState } from 'react'

import s from './Input.module.scss'

type InputType = 'default' | 'email' | 'search' | 'password'

const placeholders: Record<InputType, string> = {
  default: '',
  email: 'Epam@epam.com',
  search: 'Input search',
  password: 'Enter your password',
}

const labels: Record<InputType, string> = {
  default: '',
  email: 'Email',
  search: '',
  password: 'Password',
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
          className={`${s.input} ${error ? s.error : ''}`}
          type={type === 'password' && !showPassword ? 'password' : 'text'}
          placeholder={placeholders[type]}
          disabled={disabled}
        />
        {type === 'password' && (
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
