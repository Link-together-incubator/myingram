import { Eye, EyeClosed, Search } from 'lucide-react'
import { InputHTMLAttributes, useState } from 'react'

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
  variant?: InputType
  error?: string | null
  disabled?: boolean
  className?: string
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({
  variant = 'default',
  error,
  disabled,
  className,
  label,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className={`${s.wrapper} ${className ? className : ''}`}>
      <label className={s.label}>{label || labels[variant]}</label>
      <div
        className={`${s.inputWrapper} ${variant === 'search' ? s.searchInputWrapper : ''}`}
      >
        {variant === 'search' && <Search className={s.searchIcon} size={20} />}
        <input
          className={`${s.input} ${error ? s.error : ''}`}
          type={variant === 'password' && !showPassword ? 'password' : 'text'}
          placeholder={placeholders[variant]}
          disabled={disabled}
          {...props}
        />
        {variant === 'password' && (
          <button
            type="button"
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
