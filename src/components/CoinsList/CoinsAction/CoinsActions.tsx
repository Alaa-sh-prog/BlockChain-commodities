import {useMemo} from 'react'
import {Button} from '../../Button/Button'

interface CoinsActionsProps {
  selected: string[]
  onBuy?: () => void
  onSell?: () => void
  onCancel?: () => void
}

export const CoinsActions = ({selected, onBuy, onSell, onCancel}: CoinsActionsProps) => {
  const SelectedItems = useMemo(() => {
    if (selected.length > 0)
      return (
        <Button size='sm' type='button' variant='primary'>
          {`Selected (${selected.length})`}
        </Button>
      )
    else return null
  }, [selected.length])

  //   const Buy = useMemo(() => {
  //     if (onBuy && selected.length > 0)
  //       return (
  //         <Button size='sm' type='button' onClick={onBuy} variant='primary'>
  //           {`Buy (${selected.length})`}
  //         </Button>
  //       )
  //     else return null
  //   }, [onBuy, selected.length])

  //   const Sell = useMemo(() => {
  //     if (onSell && selected.length > 0)
  //       return (
  //         <Button className='ms-3' size='sm' onClick={onSell} variant='warning'>
  //           {`Sell (${selected.length})`}
  //         </Button>
  //       )
  //     else return null
  //   }, [onSell, selected.length])

  const CancelBidding = useMemo(() => {
    if (onCancel)
      return (
        <Button size='sm' onClick={onCancel} className='text-muted'>
          Cancel Bid
        </Button>
      )
    else return null
  }, [onCancel])

  return (
    <>
      <hr />
      <div className='d-flex justify-content-between my-2'>
        <div className='d-flex gap-10'>
          {SelectedItems}
          {/* {Buy}
          {Sell} */}
        </div>
        <div>{CancelBidding}</div>
      </div>
      <hr />
    </>
  )
}
