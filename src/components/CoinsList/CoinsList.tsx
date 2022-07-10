import {useCallback, useEffect, useState} from 'react'
import {useDebounce} from 'use-debounce'
import {SpinnerGrow} from '../SpinnerGrow'
import {TextInput} from '../form/TextInput/TextInput'
import {useCoinData} from './hooks/useCoinData'
import CustomAlert from '../Alert'
import {CustomInfiniteScroll} from '../CustomInfiniteScroll/CustomInfiniteScroll'
import CoinCard from './CoinCard'
import {CoinsActions} from './CoinsAction/CoinsActions'
import {FormModel} from './CoinsForm/FormModel'
import {CustomModel} from '../CustomModel'

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
  isSelect?: boolean
}

export const CoinsList = () => {
  const {
    refreshList,
    searchList,
    isLoading,
    error,
    coinsList,
    fetchMoreData,
    hasMore,
    lastMessage,
    allTheList,
    setAllTheList,
  } = useCoinData()
  const [searchText, setSearchText] = useState<string>('')
  const [value] = useDebounce(searchText, 1000)
  const [selected, setSelected] = useState<string[]>([])
  const [showModel, setShowModel] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  useEffect(() => {
    refreshList()
  }, [refreshList])

  useEffect(() => {
    searchList(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const handleSelect = useCallback(
    (symbol: string) => {
      let currentIndex = 0
      const found = allTheList.find((item, index) => {
        currentIndex = index
        return item.symbol === symbol
      })
      if (found) {
        const old = [...allTheList]
        old[currentIndex].isSelect = !old[currentIndex].isSelect
        setAllTheList(old)
        if (old[currentIndex].isSelect)
          setSelected((previous) => {
            return [...previous, symbol]
          })
        else {
          const remove = selected.filter((item) => item !== symbol)
          setSelected(remove)
        }
      }
    },
    [allTheList, selected, setAllTheList]
  )

  const handleCancelBidding = useCallback(() => {
    setShowModel(true)
  }, [])

  const handleConfirm = useCallback(() => {
    setShowModel(false)
    setShowAlert(true)
  }, [])

  return (
    <div className='p-3'>
      <CoinsActions selected={selected} onCancel={handleCancelBidding} />
      <div className='row'>
        <div className='col-12'>
          <div>
            <div className='mb-3'>
              <TextInput
                type='text'
                placeholder='Search'
                onChange={(event) => setSearchText(event.target.value)}
                endAdornment={<i className='bi bi-upload fs-3'></i>}
              />
            </div>
          </div>
          <div
            className='mb-5 overflow-hidden'
            style={{
              height: '65vh',
            }}
          >
            {isLoading ? (
              <SpinnerGrow />
            ) : (
              <>
                <CustomInfiniteScroll
                  fetchMoreData={fetchMoreData}
                  hasMore={hasMore}
                  currentList={coinsList}
                  lastMessage={lastMessage}
                  scrollThreshold='100px'
                  height='100%'
                >
                  <div className='row g-10'>
                    {coinsList.map((coin) => (
                      <CoinCard
                        key={coin.symbol}
                        coin={coin}
                        onSelect={handleSelect}
                        isChecked={coin.isSelect ? coin.isSelect : false}
                      />
                    ))}
                  </div>
                </CustomInfiniteScroll>
              </>
            )}
            {error && <CustomAlert open={true} variant='danger' text={error} />}
          </div>
        </div>
        {/* <div className='col-md-4'>
          <FormModel />
        </div> */}
      </div>
      <CustomModel
        title='Cancel bid!'
        confirmText='Cancel'
        confirmVariant='danger'
        body='Are You Sure?'
        show={showModel}
        onHide={() => setShowModel(false)}
        onConfirm={handleConfirm}
      />
      <CustomAlert
        onHide={() => setShowAlert(false)}
        open={showAlert}
        text='Successfully Canceled!'
        variant='success'
      />
    </div>
  )
}
