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
  onHide?: () => void
}

function CustomAlert({variant, text, open, onHide}: AlertType) {
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
            onClick={onHide}
          ></button>
        </div>
      )}
    </div>
  )
}

export default CustomAlert
