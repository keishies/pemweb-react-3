import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'outline' | 'danger' | 'dangerOutline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variants: Record<Variant, string> = {
  primary: 'border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark',
  outline: 'border-brand bg-white text-brand hover:bg-blue-50',
  danger: 'border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700',
  dangerOutline: 'border-red-300 bg-white text-red-600 hover:bg-red-50',
}

const sizes: Record<Size, string> = {
  sm: 'rounded-md py-[7px] text-xs',
  md: 'rounded-lg px-3.5 py-2.5 text-sm',
  lg: 'rounded-lg px-[18px] py-2.5 text-sm',
}

function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`border font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}

export default Button