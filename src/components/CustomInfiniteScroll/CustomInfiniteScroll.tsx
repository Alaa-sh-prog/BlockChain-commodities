import {ReactNode, useMemo, useRef} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {CoinAttr} from '../CoinsList/CoinsList'
import {SpinnerGrow} from '../SpinnerGrow'

interface CustomInfiniteScrollProps {
  currentList: CoinAttr[]
  fetchMoreData: () => void
  hasMore: boolean
  lastMessage: string
  children: ReactNode
  scrollThreshold?: number | string
  height?: string
}

export const CustomInfiniteScroll = ({
  currentList,
  fetchMoreData,
  hasMore,
  lastMessage,
  scrollThreshold,
  height,
  children,
}: CustomInfiniteScrollProps) => {
  const scrollRef = useRef(null)
  const listLength = useMemo(() => {
    return currentList.length
  }, [currentList])

  return useMemo(() => {
    return (
      <InfiniteScroll
        ref={scrollRef}
        dataLength={listLength}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div>
            <SpinnerGrow />
          </div>
        }
        height={height}
        scrollThreshold={scrollThreshold}
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b>{lastMessage}</b>
          </p>
        }
      >
        {children}
      </InfiniteScroll>
    )
  }, [children, fetchMoreData, hasMore, height, lastMessage, listLength, scrollThreshold])
}
