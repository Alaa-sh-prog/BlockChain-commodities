import {useMemo} from 'react'
import {CheckboxInput} from '../../form/CheckBoxInput/CheckBoxInput'
import {CoinAttr} from '../CoinsList'

interface CoinCardProps {
  coin: CoinAttr
  onSelect: (symbol: string) => void
  isChecked: boolean
}

const CoinCard = ({coin, onSelect, isChecked}: CoinCardProps) => {
  const card = useMemo(() => {
    return (
      <div className='col-12 col-sm-6 col-md-12 col-lg-6'>
        <div className='card mb-3'>
          <div className='row g-0'>
            <div className='col-1 p-2'>
              <CheckboxInput checked={isChecked} onChange={() => onSelect(coin.symbol)} />
            </div>
            <div className='col-md-11'>
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
          </div>
        </div>
      </div>
    )
  }, [coin, isChecked, onSelect])

  return card
}

export default CoinCard
