import {useEffect, useState} from 'react'
import {useDebounce} from 'use-debounce'
import {SpinnerGrow} from '../SpinnerGrow'
import {TextInput} from '../form/TextInput/TextInput'
import {useCoinData} from './hooks/useCoinData'
import CustomAlert from '../Alert'
import {CustomInfiniteScroll} from '../CustomInfiniteScroll/CustomInfiniteScroll'

export interface CoinAttr {
  symbol: string
  priceChange: string
  priceChangePercent: string
  weightedAvgPrice: string
  prevClosePrice: string
  lastPrice: string
  lastQty: string
  bidPrice: string
  bidQty: string
  askPrice: string
  askQty: string
  openPrice: string
  highPrice: string
  lowPrice: string
  volume: string
  quoteVolume: string
  openTime: number
  closeTime: number
  firstId: number
  lastId: number
  count: number
}
export const CoinsList = () => {
  const {
    refreshList,
    searchList,
    isLoading,
    error,
    coinsList,
    searchCoinsList,
    fetchMoreData,
    hasMore,
    lastMessage,
  } = useCoinData()
  const [searchText, setSearchText] = useState<string>('')
  const [value] = useDebounce(searchText, 1000)

  useEffect(() => {
    refreshList()
  }, [refreshList])

  useEffect(() => {
    searchList(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div className='p-3'>
      <div className='mb-3'>
        <TextInput
          type='text'
          className='form-control'
          placeholder='Search'
          onChange={(event) => setSearchText(event.target.value)}
          endAdornment={<i className='bi bi-upload fs-3'></i>}
        />
      </div>
      <div
        className='mb-5 overflow-hidden'
        style={{
          height: '70vh',
        }}
      >
        {isLoading ? (
          <SpinnerGrow />
        ) : (
          <CustomInfiniteScroll
            fetchMoreData={fetchMoreData}
            hasMore={hasMore}
            searchList={searchCoinsList}
            currentList={coinsList}
            lastMessage={lastMessage}
          />
        )}
        {error && <CustomAlert variant='danger' text={error} />}
      </div>
    </div>
  )
}
