import {useCallback, useEffect, useState} from 'react'
import {useDebounce} from 'use-debounce'
import {SpinnerGrow} from '../SpinnerGrow'
import {TextInput} from '../form/TextInput/TextInput'
import {useCoinData} from './hooks/useCoinData'
import CustomAlert from '../Alert'
import {CustomInfiniteScroll} from '../CustomInfiniteScroll/CustomInfiniteScroll'
import CoinCard from './CoinCard'
import {CoinsActions} from './CoinsAction/CoinsActions'
import {CustomModel} from '../CustomModel'
import {FormModel} from './CoinsForm/FormModel'
import {map, forEach} from 'lodash'
import {FormParams} from './CoinsForm/Buy'
import {AlertParams, BuySellModelParams, CoinAttr, PriceParams} from './ModelTypes'

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
  const [showAlert, setShowAlert] = useState<AlertParams>({
    show: false,
    text: '',
    variant: '',
    timer: 0,
  })
  const [showBuySellForm, setShowBuySellForm] = useState<BuySellModelParams>({
    type: '',
    show: false,
  })
  const [price, setPrice] = useState<PriceParams>({
    minPrice: 15,
    maxPrice: 20000,
    maxQuantity: 2000,
  })
  const [singleSelectedBid, setSingleSelectedBid] = useState<string>('')

  useEffect(() => {
    refreshList()
  }, [refreshList])

  useEffect(() => {
    searchList(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  // CLEAR SELECTED
  const clearSelected = useCallback(() => {
    const oldAllTheList = [...allTheList]
    let currentIndexAll = 0
    forEach(selected, (item) => {
      const foundOldAll = oldAllTheList.find((coin, index) => {
        currentIndexAll = index
        return coin.symbol === item
      })
      if (foundOldAll) oldAllTheList[currentIndexAll].isSelect = false
    })
    setAllTheList(oldAllTheList)
    setSelected([])
  }, [allTheList, selected, setAllTheList])

  // HANDLE SELECTED
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

  const handleCancelSingle = useCallback((coin: CoinAttr) => {
    setShowModel(true)
    setSingleSelectedBid(coin.symbol)
  }, [])

  const handleBuyBluk = useCallback(() => {
    setShowBuySellForm({
      type: 'buy',
      show: true,
    })
  }, [])

  const handleSellBluk = useCallback(() => {
    setShowBuySellForm({
      type: 'sell',
      show: true,
    })
  }, [])

  const handleBuySingle = useCallback((coin: CoinAttr) => {
    setPrice({
      minPrice: parseFloat(coin.lowPrice),
      maxPrice: parseFloat(coin.highPrice),
      maxQuantity: parseFloat(coin.bidQty),
    })
    setShowBuySellForm({
      type: 'buy',
      show: true,
    })
  }, [])

  const handleSellSingle = useCallback(() => {
    setShowBuySellForm({
      type: 'sell',
      show: true,
    })
  }, [])

  const handleConfirmCancellation = useCallback(() => {
    setShowModel(false)
    setShowAlert({
      show: true,
      text: 'Successfully Canceled',
      variant: 'success',
      timer: 3000,
    })
    clearSelected()
  }, [clearSelected])

  const handleHideFormModel = useCallback(() => {
    setShowBuySellForm({
      type: '',
      show: false,
    })
    setPrice({
      minPrice: 15,
      maxPrice: 20000,
      maxQuantity: 2000,
    })
  }, [])

  // SUBMIT
  const handleSubmit = useCallback(
    (values: FormParams) => {
      try {
        alert(JSON.stringify(values, null, 2))
        handleHideFormModel()
        setShowAlert({
          show: true,
          text: 'Submited Successfully',
          variant: 'success',
          timer: 3000,
        })
        clearSelected()
      } catch {
        setShowAlert({
          show: true,
          text: 'Wrong data',
          variant: 'danger',
          timer: 3000,
        })
      } finally {
        handleHideFormModel()
        clearSelected()
      }
    },
    [clearSelected, handleHideFormModel]
  )

  return (
    <div className='p-3'>
      <div className='row'>
        <div className='col-12'>
          <div>
            <div className='mb-3'>
              <TextInput
                type='text'
                placeholder='Search'
                onChange={(event) => setSearchText(event.target.value)}
              />
            </div>
          </div>
          {selected.length > 0 && (
            <CoinsActions
              selected={selected}
              onCancel={() => setShowModel(true)}
              onBuy={handleBuyBluk}
              onSell={handleSellBluk}
            />
          )}
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
                  <div className='row g-10 w-100 m-auto'>
                    {map(coinsList, (coin) => (
                      <CoinCard
                        key={coin.symbol}
                        coin={coin}
                        onSelect={handleSelect}
                        isChecked={coin.isSelect ? coin.isSelect : false}
                        onBuy={handleBuySingle}
                        onSell={handleSellSingle}
                        onCancel={handleCancelSingle}
                      />
                    ))}
                  </div>
                </CustomInfiniteScroll>
              </>
            )}
            {error && (
              <CustomAlert
                timer={3000}
                setShowAlert={setShowAlert}
                open={true}
                variant='danger'
                text={error}
              />
            )}
          </div>
        </div>
      </div>
      <CustomModel
        title={`Cancel Bid ${singleSelectedBid}`}
        confirmText='Cancel'
        closeText='Close'
        confirmVariant='danger'
        body='Are You Sure?'
        show={showModel}
        onHide={() => setShowModel(false)}
        onConfirm={handleConfirmCancellation}
      />

      <FormModel
        title={showBuySellForm.type}
        show={showBuySellForm.show}
        onHide={handleHideFormModel}
        type={showBuySellForm.type}
        maxPrice={price.maxPrice}
        minPrice={price.minPrice}
        maxQuantity={price.maxQuantity}
        onSubmit={handleSubmit}
      />

      <CustomAlert
        setShowAlert={setShowAlert}
        open={showAlert.show}
        text={showAlert.text}
        variant={showAlert.variant}
        timer={showAlert.timer}
      />
    </div>
  )
}
