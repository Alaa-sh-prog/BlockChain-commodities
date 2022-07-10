import {useEffect} from 'react'
import {AlertParams} from '../CoinsList/ModelTypes'

export type VariantType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | ''

type AlertType = {
  variant: VariantType
  text: string
  open: boolean
  setShowAlert: (values: AlertParams) => void
  timer: number
}

function CustomAlert({variant, text, open, setShowAlert, timer}: AlertType) {
  useEffect(() => {
    const time = setTimeout(() => {
      setShowAlert({
        show: false,
        text: '',
        variant: '',
        timer: 0,
      })
    }, timer)
    return () => {
      clearTimeout(time)
    }
  }, [setShowAlert, timer])

  return (
    <div className='d-flex position-fixed bottom-0 end-0 translate-x-50 m-3'>
      {open && (
        <div
          className={`alert alert-${variant} alert-dismissible fade ${open ? 'show' : ''}`}
          role='alert'
        >
          {text}
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='alert'
            aria-label='Close'
            onClick={() => {
              setShowAlert({
                show: false,
                text: '',
                variant: '',
                timer: 0,
              })
            }}
          ></button>
        </div>
      )}
    </div>
  )
}

export default CustomAlert
