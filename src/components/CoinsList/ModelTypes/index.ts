import {VariantType} from '../../Alert'

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

export interface PriceParams {
  minPrice: number
  maxPrice: number
  maxQuantity: number
}

export interface BuySellModelParams {
  type: string
  show: boolean
}

export interface AlertParams {
  text: string
  show: boolean
  variant: VariantType
}
