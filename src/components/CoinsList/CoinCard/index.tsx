import {useMemo} from 'react'
import {CoinAttr} from '../CoinsList'

interface CoinCardProps {
  coin: CoinAttr
}

const CoinCard = ({
  coin: {symbol, priceChange, lastPrice, weightedAvgPrice, volume},
}: CoinCardProps) => {
  const card = useMemo(() => {
    return (
      <div className='card mb-3'>
        <div className='row g-0'>
          <div className='col-md-4'>
            <div className='card-body'>
              <p className='card-text'>
                Symbol:
                <span className='badge badge-bg-primary mx-2'>{symbol}</span>
              </p>
              <p className='card-text'>
                Price Change:
                <span className='badge badge-bg-secondary mx-2'>{priceChange}</span>
              </p>
              <p className='card-text'>
                Last Price:
                <span className='badge badge-bg-secondary mx-2'>{lastPrice}</span>
              </p>
              <p className='card-text'>
                Volume:
                <span className='badge badge-bg-secondary mx-2'>{volume}</span>
              </p>
            </div>
          </div>
          <div className='col-md-8'>
            <div className='card-body'>
              <h5 className='card-title'>weightedAvgPrice: {weightedAvgPrice}</h5>
            </div>
          </div>
        </div>
      </div>
    )
  }, [symbol, priceChange, weightedAvgPrice, volume, lastPrice])

  return card
}

export default CoinCard
