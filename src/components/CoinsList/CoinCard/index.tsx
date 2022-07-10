import {useMemo} from 'react'
import {Button} from '../../Button/Button'
import {CheckboxInput} from '../../form/CheckBoxInput/CheckBoxInput'
import {CoinAttr} from '../ModelTypes'

interface CoinCardProps {
  coin: CoinAttr
  onSelect: (symbol: string) => void
  isChecked: boolean
  onBuy: (coin: CoinAttr) => void
  onSell: () => void
  onCancel: (coin: CoinAttr) => void
}

const CoinCard = ({coin, onSelect, isChecked, onBuy, onSell, onCancel}: CoinCardProps) => {
  const card = useMemo(() => {
    return (
      <div className='col-md-6'>
        <div className='card mb-3'>
          <div className='row g-0'>
            <div className='col-1 p-2'>
              <CheckboxInput checked={isChecked} onChange={() => onSelect(coin.symbol)} />
            </div>
            <div className='col-8'>
              <div className='card-body'>
                <p className='card-text mb-2'>
                  Symbol:
                  <span className='badge badge-bg-primary mx-2'>{coin.symbol}</span>
                </p>
                <p className='card-text mb-2'>
                  Price Change:
                  <span className='badge badge-bg-secondary mx-2'>{coin.priceChange}</span>
                </p>
                <p className='card-text mb-2'>
                  Last Price:
                  <span className='badge badge-bg-secondary mx-2'>{coin.lastPrice}</span>
                </p>
                <p className='card-text mb-2'>
                  Volume:
                  <span className='badge badge-bg-secondary mx-2'>{coin.volume}</span>
                </p>
              </div>
            </div>
            <div className='col-3 text-end'>
              <Button size='sm' type='button' className='text-muted' onClick={() => onBuy(coin)}>
                <i className='bi bi-cart text-primary'></i>
              </Button>

              <Button size='sm' type='button' className='text-muted' onClick={onSell}>
                <i className='bi bi-basket3-fill text-danger'></i>
              </Button>
              <Button size='sm' type='button' className='text-muted' onClick={() => onCancel(coin)}>
                <i className='bi bi-x-circle'></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }, [coin, isChecked, onBuy, onCancel, onSelect, onSell])

  return card
}

export default CoinCard
