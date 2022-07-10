import {BuyForm, FormParams} from './Buy'
import {SellForm} from './Sell'
import {Modal} from 'react-bootstrap-v5'

interface FormModelProps {
  show: boolean
  onHide: () => void
  title: string
  minPrice: number
  maxPrice: number
  maxQuantity: number
  type: string
  selected?: string[]
  onSubmit: (values: FormParams) => void
}
export const FormModel = ({
  show,
  onHide,
  title,
  minPrice,
  maxPrice,
  type,
  maxQuantity,
  onSubmit,
}: FormModelProps) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title className='w-100 text-center'>
          {title.toLocaleUpperCase()}
          <i
            className='bi bi-x-lg'
            style={{
              float: 'right',
              cursor: 'pointer',
            }}
            onClick={onHide}
          ></i>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='justify-content-center'>
        {type === 'buy' && (
          <BuyForm
            minPrice={minPrice}
            maxPrice={maxPrice}
            maxQuantity={maxQuantity}
            onSubmit={onSubmit}
          />
        )}
        {type === 'sell' && <SellForm onSubmit={onSubmit} />}
      </Modal.Body>
    </Modal>
  )
}
