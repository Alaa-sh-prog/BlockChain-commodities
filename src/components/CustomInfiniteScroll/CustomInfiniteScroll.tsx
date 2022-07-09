import {useMemo} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CoinCard from '../CoinsList/CoinCard'
import {CoinAttr} from '../CoinsList/CoinsList'
import {SpinnerGrow} from '../SpinnerGrow'

interface CustomInfiniteScrollProps {
  currentList?: CoinAttr[] | null
  searchList?: CoinAttr[] | null
  fetchMoreData: () => void
  hasMore: boolean
  lastMessage: string
}

export const CustomInfiniteScroll = ({
  searchList,
  currentList,
  fetchMoreData,
  hasMore,
  lastMessage,
}: CustomInfiniteScrollProps) => {
  const listLength = useMemo(() => {
    if (searchList) {
      return searchList.length
    }
    if (currentList) {
      return currentList.length
    }
    return 0
  }, [searchList, currentList])

  return useMemo(() => {
    return (
      <InfiniteScroll
        dataLength={listLength}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div>
            <SpinnerGrow />
          </div>
        }
        height='100%'
        scrollThreshold={0.95}
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b>{lastMessage}</b>
          </p>
        }
      >
        {searchList
          ? searchList &&
            searchList.length > 0 &&
            searchList.map((coin) => <CoinCard key={coin.symbol} coin={coin} />)
          : currentList &&
            currentList.length > 0 &&
            currentList.map((coin) => <CoinCard key={coin.symbol} coin={coin} />)}
      </InfiniteScroll>
    )
  }, [currentList, fetchMoreData, hasMore, lastMessage, listLength, searchList])
}
