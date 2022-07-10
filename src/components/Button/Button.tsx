import {forwardRef, ReactNode, DetailedHTMLProps, useCallback, useMemo, useRef} from 'react'
import clsx from 'clsx'
import {OverlayTrigger, Tooltip} from 'react-bootstrap-v5'

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
  tooltip?: string
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
      tooltip,
      color,
      size = 'md',
      uppercase = true,
      activeColor,
      fullWidth,
      ...props
    },
    ref
  ) => {
    const randomId = useRef<string>(`${Math.random()}`)

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

    const tooltipProps = useMemo(() => {
      if (tooltip) {
        return {
          'data-toggle': 'tooltip',
          'data-placement': 'top',
          title: tooltip,
        }
      }
    }, [tooltip])

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
        {...tooltipProps}
        {...props}
      >
        {children}
      </button>
    )
    if (tooltip) {
      return (
        <OverlayTrigger
          placement='auto'
          overlay={<Tooltip id={`${tooltip}${randomId.current}`}>{tooltip}</Tooltip>}
        >
          {button}
        </OverlayTrigger>
      )
    }
    return button
  }
)
