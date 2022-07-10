import {forwardRef, ReactNode, DetailedHTMLProps, useCallback, useMemo} from 'react'
import clsx from 'clsx'

export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info'
  | 'light'
  | 'dark'

export type ButtonVariant = 'default' | 'link' | 'text' | ColorVariant

export type ButtonSize = 'sm' | 'md' | 'lg' | 'flush'

type ButtonElementProps = Omit<
  DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'ref'
>

export interface ButtonProps extends ButtonElementProps {
  className?: string
  children?: ReactNode
  disabled?: boolean
  variant?: ButtonVariant
  color?: ColorVariant
  uppercase?: boolean
  size?: ButtonSize
  activeColor?: ColorVariant
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'default',
      className,
      color,
      size = 'md',
      uppercase = true,
      activeColor,
      fullWidth,
      ...props
    },
    ref
  ) => {
    const sizeClassName = useMemo(() => {
      switch (size) {
        case 'flush':
        case 'lg':
        case 'sm':
          return `btn-${size}`
        default:
          return ''
      }
    }, [size])

    const getVariant = useCallback(() => {
      return `btn-${variant}`
    }, [variant])

    const getColorVariant = useCallback(() => {
      if (color) {
        return `btn-color-${color}`
      }
    }, [color])

    const button = (
      <button
        ref={ref}
        className={clsx(
          'btn',
          sizeClassName,
          {'text-uppercase': uppercase, 'w-100': fullWidth},
          getVariant(),
          getColorVariant(),
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
    return button
  }
)
