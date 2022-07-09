import axios from 'axios'
import {useCallback, useMemo, useState} from 'react'
import {CoinAttr} from '../CoinsList'
import {chunk} from 'lodash'

const INITALLENGTH: number = 20
export const useCoinData = () => {
  const [allTheList, setAllTheList] = useState<CoinAttr[]>([])
  const [coinsList, setCoinsList] = useState<CoinAttr[] | null>(null)
  const [searchCoinsList, setSearchCoinsList] = useState<CoinAttr[] | null>(null)
  const [pageChuck, setPageChunk] = useState<CoinAttr[][]>([])
  const [lastMessage, setLastMessage] = useState<string>('')
  const [pageCount, setPageCount] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const clear = useCallback(() => {
    setCoinsList(null)
    setSearchCoinsList(null)
  }, [])

  const theEnd = useCallback(() => {
    setHasMore(false)
    setLastMessage('The End!')
  }, [])

  const getChunks = useCallback((data: CoinAttr[]) => {
    let _pageChunk: CoinAttr[][]
    if (data.length > INITALLENGTH) {
      _pageChunk = chunk(data, INITALLENGTH)
      setHasMore(true)
    } else {
      _pageChunk = [data]
      setHasMore(false)
    }
    setPageChunk(_pageChunk)
    setCoinsList(_pageChunk[0])
    setIsLoading(false)
  }, [])

  const refreshList = useCallback(async () => {
    clear()
    setIsLoading(true)
    if (process.env.REACT_APP_API_URL)
      try {
        const {data}: {data: CoinAttr[]} = await axios.get(process.env.REACT_APP_API_URL)
        if (data) {
          setAllTheList(data)
          getChunks(data)
        }
      } catch (err) {
        setIsLoading(false)
        setHasMore(false)
        setError('Something went wrong')
      }
  }, [clear, getChunks])

  const searchList = useCallback(
    (value: string) => {
      if (value.length > 0) {
        clear()
        setIsLoading(true)
        const filteredCoins: CoinAttr[] = []
        allTheList.forEach((coin) => {
          if (isSearchResult(coin, value)) {
            filteredCoins.push(coin)
          }
        })
        if (filteredCoins && filteredCoins.length > 0) {
          getChunks(filteredCoins)
        } else {
          setIsLoading(false)
          setHasMore(false)
          setLastMessage('No Data Found')
          clear()
        }
      } else {
        setIsLoading(false)
        refreshList()
      }
    },
    [allTheList, clear, getChunks, refreshList]
  )

  const fetchMoreData = useCallback(() => {
    if (pageCount < pageChuck.length) {
      setHasMore(true)
      setTimeout(() => {
        if (pageChuck && pageCount < pageChuck.length) {
          const page = pageCount + 1
          if (page < pageChuck.length) {
            if (searchCoinsList) {
              console.log('11111')
              const newArray = searchCoinsList.concat(pageChuck[page])
              if (newArray) setSearchCoinsList(newArray)
            }
            if (coinsList) {
              console.log('22222')
              const newArray = coinsList.concat(pageChuck[page])
              if (newArray) setCoinsList(newArray)
            }
          } else theEnd()
          setPageCount((prev) => prev + 1)
        } else theEnd()
      }, 1500)
    } else theEnd()
  }, [pageCount, pageChuck, theEnd, searchCoinsList, coinsList])

  return useMemo(
    () => ({
      refreshList,
      searchList,
      isLoading,
      coinsList,
      searchCoinsList,
      error,
      fetchMoreData,
      hasMore,
      lastMessage,
    }),
    [
      refreshList,
      searchList,
      isLoading,
      coinsList,
      searchCoinsList,
      error,
      fetchMoreData,
      hasMore,
      lastMessage,
    ]
  )
}

const isSearchResult = (coin: CoinAttr, value: string) => {
  return (
    coin.symbol.toLowerCase().includes(value.toLocaleLowerCase()) ||
    coin.priceChangePercent.toLowerCase().includes(value.toLocaleLowerCase()) ||
    coin.weightedAvgPrice.toLowerCase().includes(value.toLocaleLowerCase()) ||
    coin.prevClosePrice.toLowerCase().includes(value.toLocaleLowerCase()) ||
    coin.lastPrice.toLowerCase().includes(value.toLocaleLowerCase()) ||
    coin.lastQty.toLowerCase().includes(value.toLocaleLowerCase()) ||
    coin.bidPrice.toLowerCase().includes(value.toLocaleLowerCase()) ||
    coin.bidQty.toLowerCase().includes(value.toLocaleLowerCase()) ||
    coin.askPrice.toLowerCase().includes(value.toLocaleLowerCase()) ||
    coin.askQty.toLowerCase().includes(value.toLocaleLowerCase()) ||
    coin.openPrice.toLowerCase().includes(value.toLocaleLowerCase()) ||
    coin.highPrice.toLowerCase().includes(value.toLocaleLowerCase()) ||
    coin.lowPrice.toLowerCase().includes(value.toLocaleLowerCase()) ||
    coin.volume.toLowerCase().includes(value.toLocaleLowerCase()) ||
    coin.quoteVolume.toLowerCase().includes(value.toLocaleLowerCase())
  )
}
