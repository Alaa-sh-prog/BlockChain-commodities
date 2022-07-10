import axios from 'axios'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {CoinAttr} from '../CoinsList'
import {chunk} from 'lodash'

const INITALLENGTH: number = 20
export const useCoinData = () => {
  const [allTheList, setAllTheList] = useState<CoinAttr[]>([])
  const [coinsList, setCoinsList] = useState<CoinAttr[]>([])
  const [pageChuck, setPageChunk] = useState<CoinAttr[][]>([])
  const [lastMessage, setLastMessage] = useState<string>('')
  const [pageCount, setPageCount] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const theEnd = useCallback(() => {
    setHasMore(false)
    setLastMessage('---------- The End! ----------')
  }, [])

  const NoData = useCallback(() => {
    setCoinsList([])
    setIsLoading(false)
    setHasMore(false)
    setLastMessage('No Data Found')
  }, [])

  // GET CHUNKS
  const getChunks = useCallback(
    (data: CoinAttr[]) => {
      setIsLoading(true)
      setPageChunk([])
      setCoinsList([])
      setTimeout(() => {
        let _pageChunk: CoinAttr[][]
        if (data.length > INITALLENGTH) {
          _pageChunk = chunk(data, INITALLENGTH)
          setHasMore(true)
        } else {
          _pageChunk = [data]
          setPageCount(0)
          theEnd()
        }

        setPageChunk(_pageChunk)
        setCoinsList(_pageChunk[0])
        setIsLoading(false)
      }, 1500)
    },
    [theEnd]
  )

  // REFRESH
  const refreshList = useCallback(async () => {
    setCoinsList([])
    setIsLoading(true)
    if (process.env.REACT_APP_API_URL)
      try {
        const {data}: {data: CoinAttr[]} = await axios.get(process.env.REACT_APP_API_URL)
        if (data) {
          const dataWithIsSelect: CoinAttr[] = data.map((item) => {
            return {...item, isSelect: false}
          })
          setAllTheList(dataWithIsSelect)
          getChunks(dataWithIsSelect)
        } else {
          NoData()
        }
      } catch (err) {
        setIsLoading(false)
        setHasMore(false)
        setError('Something went wrong')
      }
  }, [NoData, getChunks])

  // SEARCH
  const searchList = useCallback(
    (value: string) => {
      setCoinsList([])
      if (value.length > 0) {
        setIsLoading(true)
        setPageCount(0)
        const filteredCoins: CoinAttr[] = []
        allTheList.forEach((coin) => {
          if (isSearchResult(coin, value)) {
            filteredCoins.push(coin)
          }
        })
        if (filteredCoins && filteredCoins.length > 0) {
          getChunks(filteredCoins)
        } else {
          NoData()
        }
      } else {
        setCoinsList([])
        setIsLoading(false)
        if (allTheList.length > 0) getChunks(allTheList)
      }
    },
    [NoData, allTheList, getChunks]
  )

  useEffect(() => {}, [pageCount])

  const fetchMoreData = useCallback(() => {
    if (pageCount < pageChuck.length) {
      setHasMore(true)
      setTimeout(() => {
        const page = pageCount + 1
        if (page < pageChuck.length) {
          const newCoinList = coinsList.concat(pageChuck[page])
          if (newCoinList) {
            setCoinsList(newCoinList)
            setPageCount((prev) => prev + 1)
          }
        } else {
          theEnd()
        }
      }, 1500)
    } else theEnd()
  }, [pageCount, pageChuck, theEnd, coinsList])

  return useMemo(
    () => ({
      refreshList,
      searchList,
      isLoading,
      coinsList,
      error,
      fetchMoreData,
      hasMore,
      lastMessage,
      allTheList,
      setAllTheList,
    }),
    [
      refreshList,
      searchList,
      isLoading,
      coinsList,
      error,
      fetchMoreData,
      hasMore,
      lastMessage,
      allTheList,
      setAllTheList,
    ]
  )
}

// IS SEARCH HAS  VALUES
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
