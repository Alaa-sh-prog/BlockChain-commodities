import type {DetailedHTMLProps, InputHTMLAttributes} from 'react'
import clsx from 'clsx'

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export interface CheckboxInputProps extends InputProps {
  fullWidth?: boolean
}

export const CheckboxInput = ({fullWidth, className, value, ...inputProps}: CheckboxInputProps) => {
  return (
    <div className={clsx(`form-check`, {'w-100': fullWidth}, className)}>
      <input
        className='form-check-input'
        type='checkbox'
        value={value}
        id='flexCheckDefault'
        {...inputProps}
      />
    </div>
  )
}
